import { Modal } from './Modal.js';
import { Calendar as FullCalendar } from '@fullcalendar/core';
import resourceTimelinePlugin from '@fullcalendar/resource-timeline';
import interactionPlugin from '@fullcalendar/interaction';

export class Calendar {
    constructor(data) {
        this.element = document.getElementById('calendar');
        this.calendar = null;
        this.selectedEvent = null;
        this.data = data || {}; // Ensure `data` is defined
    }

    initialize() {
        this.calendar = new FullCalendar(this.element, {
            plugins: [resourceTimelinePlugin, interactionPlugin],
            initialView: 'resourceTimelineDay',
            schedulerLicenseKey: 'GPL-My-Project-Is-Open-Source',
            initialDate: new Date(),
            slotMinTime: '06:00:00',
            slotMaxTime: '24:00:00',
            resourceAreaWidth: '300px',
            height: '100%',
            resourceAreaHeaderContent: 'Máy Móc',
            nowIndicator: true,
            selectable: true,
            editable: true,
            events: this.mapTienDoSanXuatToEvents(),
            resources: this.data?.MayMoc?.map(may => ({
                id: may.MayMocID,
                title: may.TenMayMoc
            })) || [],
            select: (info) => this.handleAddEvent(info),
            eventClick: (info) => this.handleEditEvent(info),
            eventContent: (arg) => ({
                html: `<div class="event-content">${arg.event.title}</div>`
            }),
        });

        this.calendar.render();
        return this;
    }

    mapTienDoSanXuatToEvents() {
        if (!this.data || !this.data.TienDoSanXuat) {
            console.error("TienDoSanXuat data is missing");
            return [];
        }
    
        return this.data.TienDoSanXuat.map(tienDo => {
            const chiTiet = this.data.ChiTietLichSanXuat?.find(chiTiet => chiTiet.ChiTietID === tienDo.ChiTietID) || {};
            const keHoach = this.data.KeHoachSanXuat?.find(keHoach => keHoach.KeHoachID === chiTiet.KeHoachID) || {};
            const nhomLamViec = this.data.NhomLamViec?.find(nhom => nhom.NhomLamViecID === tienDo.NhomLamViecID);
            
            // Get the color details from MauLich using MauID
            const mau = this.data.MauLich?.find(mau => mau.MauID === tienDo.MauID) || {};
            const colorBackground = mau.MauNen || '#ffffff'; // Default background color
            const colorBorder = mau.MauVien || '#000000'; // Default border color
            const colorText = mau.MauChu || '#000000'; // Default text color
    
            return {
                id: `${tienDo.TienDoID}`,
                title: nhomLamViec?.TenNhomLamViec || "Unknown Group", // Use TenNhomLamViec for the title
                start: tienDo.ThoiGianBatDauThucTe,
                end: tienDo.ThoiGianKetThucThucTe,
                resourceId: keHoach.MayMocID || null,
                color: colorBackground, // Background color
                borderColor: colorBorder, // Border color
                textColor: colorText, // Text color
                description: tienDo.GhiChu || '', // Ensure description is a string
                status: tienDo.TrangThai || "Unknown", // Provide a fallback value for status
            };
        });
    }

    handleAddEvent(info) {
        const modal = new Modal({
            title: 'Add New Event',
            content: `
                <label for="add-title">Title:</label>
                <input type="text" id="add-title" placeholder="Enter event title" /><br>
                <label for="add-description">Description:</label>
                <input type="text" id="add-description" placeholder="Enter event description" />
            `,
            onConfirm: () => {
                const title = document.getElementById('add-title')?.value;
                const description = document.getElementById('add-description')?.value;
                if (title) {
                    const uniqueId = Date.now(); // Unique event ID
                    this.calendar.addEvent({
                        id: uniqueId,
                        title: title,
                        start: info.startStr, // Use the start date from FullCalendar's selection
                        end: info.endStr,     // Use the end date from FullCalendar's selection
                        resourceId: info.resource.id,
                        color: '#3788d8', // Default color for the event
                        textColor: 'white',
                        description: description || '', // Optional description
                    });
                    modal.destroy(); // Close the modal after event is added
                }
            },
            onCancel: () => modal.destroy(),
        });
    
        modal.show();
    }

    handleEditEvent(info) {
        const tienDo = this.data.TienDoSanXuat.find(t => t.TienDoID === parseInt(info.event.id));
        const chiTiet = this.data.ChiTietLichSanXuat.find(c => c.ChiTietID === tienDo?.ChiTietID);
        
        // If necessary, handle missing data here
        // if (!tienDo || !chiTiet) {
        //     console.error("Event data is incomplete.");
        //     return;
        // }
        
        const modal = new Modal({
            title: `Event Details: ${info.event.title}`,
            content: `
                <div>
                    <label for="edit-title-${info.event.id}">Title:</label>
                    <input type="text" id="edit-title-${info.event.id}" value="${info.event.title || ""}" /><br>
                    <label for="edit-description">Description:</label>
                    <input type="text" id="edit-description" value="${info.event.extendedProps.description || tienDo?.GhiChu || ""}" />
                    <hr />
                    <p>Thời Gian Bắt Đầu: ${info.event.start.toLocaleString()}</p>
                    <p>Thời Gian Kết Thúc: ${info.event.end.toLocaleString()}</p>
                    <p>Trạng Thái: ${tienDo?.TrangThai || "Unknown"}</p>
                    <hr />
                    <h5>Chi Tiết Lịch Sản Xuất:</h5>
                    <p>Số Lượng Chạy: ${chiTiet?.SoLuongChay || "Unknown"}</p>
                    <p>Số Lượng Còn Lại: ${chiTiet?.SoLuongConLai || "Unknown"}</p>
                    <p>Thứ Tự Chạy: ${chiTiet?.ThuTuChay || "Unknown"}</p>
                    <p>Số Lượng Chạy Thực Tế: ${chiTiet?.SoLuongChayThucTe || "Unknown"}</p>
                    <p>Tỷ Lệ Chạy: ${chiTiet?.TyLeChay || "Unknown"}</p>
                </div>
            `,
            onConfirm: () => {
                const titleElement = document.getElementById(`edit-title-${info.event.id}`);
                const descriptionElement = document.getElementById('edit-description');
        
                const newTitle = titleElement?.value;
                const newDescription = descriptionElement?.value;
                if (newTitle) {
                    info.event.setProp("title", newTitle);  // Update the event's title
                    info.event.setExtendedProp("description", newDescription);  // Update the description
                }
                modal.destroy();
            },
            onDelete: () => {
                if (confirm("Are you sure you want to delete this event?")) {
                    info.event.remove();
                    modal.destroy();
                }
            },
        });
        
        modal.show();
    }
}
