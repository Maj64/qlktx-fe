import React, { forwardRef, useImperativeHandle } from 'react';
import axios from 'axios';

const DeleteStudentRoom = forwardRef((props, ref) => {
    const studentId = props.studentId;
    const urlDelete = 'http://localhost:8080/QuanLyKTX_war_exploded/room/student';

    useImperativeHandle(ref, () => ({
        deleteStudent() {
            axios.delete(urlDelete, { params: { idStudent: studentId } }).then((res) => console.log(res));
        },
    }));

    return (
        <section>
            <span>Bạn chắc chắn muốn xoá sinh viên khỏi phòng?</span>
        </section>
    );
});
export default DeleteStudentRoom;
