import { forwardRef, useImperativeHandle, useState } from 'react';
import React from 'react';
import axios from 'axios';
import classNames from 'classnames/bind';
import styles from './room.model.scss';
const cx = classNames.bind(styles);

const UpdateRoom = forwardRef((props, ref) => {
    const roomId = props.roomId;
    const [roomCode, setRoomCode] = useState(props.roomCode);
    const [maxSlots, setMaxSlots] = useState(props.maxSlots);
    const [paymentState, setPaymentState] = useState(props.roomPaymentState);
    const [roomState, setRoomState] = useState(props.roomState);

    const numberSlots = props.maxSlots - props.availableSlots;
    const urlPut = 'http://localhost:8080/QuanLyKTX_war_exploded/room';

    useImperativeHandle(ref, () => ({
        putRoom() {
            let isValid = true;
            const putData = {
                roomCode: roomCode,
                maxSlots: maxSlots,
                availableSlots: maxSlots - numberSlots,
                roomPaymentState: paymentState,
                roomState: roomState,
            };
            if (putData.roomCode === '') isValid = false;

            if (maxSlots < numberSlots) {
                alert('Không thể giảm chỗ ở xuống dưới mức đang ở!!');
                isValid = false;
            }

            if (isValid === true) {
                axios.put(urlPut, putData, { params: { idRoom: roomId } }).then((res) => console.log(res));
            }
            return isValid;
        },
    }));

    return (
        <section>
            <h1 className={cx('title')}>Cập nhật phòng</h1>
            <label>
                <span>Mã phòng</span>
                <input
                    type="text"
                    onChange={(event) => setRoomCode(event.target.value)}
                    value={roomCode}
                    required
                ></input>
            </label>
            <label>
                <span>Lượng ở tối đa</span>
                <input
                    type="number"
                    onChange={(event) => setMaxSlots(event.target.value)}
                    value={maxSlots}
                    required
                ></input>
            </label>
            <label>
                <span>Trạng thái thanh toán</span>
                <select onChange={(event) => setPaymentState(event.target.value)} value={paymentState}>
                    <option value="1">Đã trả đủ tiền điện nước</option>
                    <option value="2">Còn thiếu tiền điện nước</option>
                </select>
            </label>
            <label>
                <span>Trạng thái phòng</span>
                <select onChange={(event) => setRoomState(event.target.value)} value={roomState}>
                    <option value="1">Đang ở</option>
                    <option value="2">Đang khoá</option>
                </select>
            </label>
        </section>
    );
});

export default UpdateRoom;
