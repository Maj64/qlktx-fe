import { forwardRef, useEffect, useImperativeHandle, useState } from 'react';
import React from 'react';
import axios from 'axios';
import classNames from 'classnames/bind';
import styles from './room.model.scss';
const cx = classNames.bind(styles);

const AddStudentRoom = forwardRef((props, ref) => {
    const urlPost = 'http://localhost:8080/QuanLyKTX_war_exploded/room/student';

    useImperativeHandle(ref, () => ({
        postStudentRoom(studentCode) {
            let isValid = true;
            const postData = {
                roomId: props.roomId,
                studentId: studentCode,
            };
            if (postData.studentId === '') isValid = false;

            if (isValid === true) {
                axios.post(urlPost, postData).then((res) => console.log(res));
            }
            return isValid;
        },
    }));

    return (
        <div>
            <section>
                <h1 className={cx('title')}>Thêm sinh viên vào phòng</h1>
                <form className={cx('form')}>
                    <label>
                        <span>Mã sinh viên</span>
                    </label>
                </form>
            </section>
        </div>
    );
});

export default AddStudentRoom;
