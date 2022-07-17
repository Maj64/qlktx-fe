import { forwardRef, useImperativeHandle, useState } from 'react';
import React from 'react';
import axios from 'axios';
import classNames from 'classnames/bind';
import styles from './room.model.scss';
const cx = classNames.bind(styles);

const AddRoom = forwardRef((props, ref) => {
    const [roomCode, setRoomCode] = useState('');
    const [maxSlots, setMaxSlots] = useState(0);

    const urlPost = 'http://localhost:8080/QuanLyKTX_war_exploded/room';

    useImperativeHandle(ref, () => ({
        postRoom(rooms) {
            let isValid = true;
            const postData = {
                roomCode: roomCode,
                maxSlots: maxSlots,
                availableSlots: maxSlots,
            };
            if (postData.roomCode === '') isValid = false;

            if (maxSlots < 0) {
                alert('Số lượng chỗ ở không thể nhỏ hơn 0');
                isValid = false;
            }

            rooms.forEach((element) => {
                if (roomCode === element.roomCode) {
                    alert('Phòng đã tồn tại!!!');
                    isValid = false;
                }
            });
            /*const data = {
                "roomCode": "B02",
                "maxSlots": 1
            }*/

            if (isValid === true) {
                axios.post(urlPost, postData).then((res) => console.log(res));
            }

            return isValid;
        },
    }));

    return (
        <section>
            <h1 className={cx('title')}>Thêm phòng</h1>
            <form className={cx('form')}>
                <label>
                    <span>Mã phòng</span>
                    <input
                        type="text"
                        onChange={(event) => setRoomCode(event.target.value)}
                        placeholder="B102"
                        required
                    ></input>
                </label>
                <label>
                    <span>Lượng ở tối đa</span>
                    <input type="number" onChange={(event) => setMaxSlots(event.target.value)} placeholder="10"></input>
                </label>
            </form>
        </section>
    );
});

export default AddRoom;
