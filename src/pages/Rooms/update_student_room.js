import { forwardRef, useImperativeHandle, useState } from 'react';
import React from 'react';
import axios from 'axios';
import classNames from 'classnames/bind';
import styles from './room.model.scss';
const cx = classNames.bind(styles);

const UpdateStudentRoom = forwardRef((props, ref) => {
    const studentId = props.studentId;
    const [payMoneyRemain, setMoneyRemain] = useState(props.payMoneyRemain);

    const urlPut = 'http://localhost:8080/QuanLyKTX_war_exploded/room/student';
    useImperativeHandle(ref, () => ({
        putStudent() {
            let isValid = true;
            const putData = {
                payMoneyRemain: payMoneyRemain,
            };
            if (payMoneyRemain < 0) {
                alert('Số tiền không thể nhỏ hơn không');
                isValid = false;
            }
            if (isValid === true) {
                axios.put(urlPut, putData, { params: { idStudent: studentId } }).then((res) => console.log(res));
            }
            return isValid;
        },
    }));

    return (
        <section>
            <h1 className={cx('title')}>Cập nhật sinh viên trong phòng</h1>
            <label>
                <span>Số tiền còn thiếu</span>
                <input
                    type="number"
                    onChange={(event) => setMoneyRemain(event.target.value)}
                    value={payMoneyRemain}
                    required
                ></input>
            </label>
        </section>
    );
});

export default UpdateStudentRoom;
