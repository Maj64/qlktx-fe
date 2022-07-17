import React, { forwardRef, useImperativeHandle } from 'react';
import axios from 'axios';

const DeleteRoom = forwardRef((props, ref) => {
    const roomId = props.roomId;
    const urlDelete = 'http://localhost:8080/QuanLyKTX_war_exploded/room';

    useImperativeHandle(ref, () => ({
        deleteRoom() {
            axios.delete(urlDelete, { params: { idRoom: roomId } }).then((res) => console.log(res));
        },
    }));

    return (
        <section>
            <span>
                Bạn có chắc chắn muốn xoá phòng này không? Các sinh viên trong phòng sẽ tự động chuyển khỏi phòng!!
            </span>
        </section>
    );
});
export default DeleteRoom;
