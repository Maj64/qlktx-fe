import { forwardRef, useEffect, useImperativeHandle, useState, useRef } from 'react';
import React from 'react';
import Popup from '~/components/popup/popup';
import AddStudentRoom from './add_student_room';
import axios from 'axios';
import SearchStudent from '~/components/searchStudent/searchstudent';
import classNames from 'classnames/bind';
import styles from './room.model.scss';
const cx = classNames.bind(styles);

const ShowRoom = forwardRef((props, ref) => {
    const [change, setChange] = useState(false);
    const [roomID, setRoomID] = useState(0);
    const [room, setRoom] = useState(props);
    const [students, setStudents] = useState('');
    const [studentCode, setStudentCode] = useState('');
    const [isFirstTime, setIsFirstTime] = useState(true);
    const [isAddStudent, setIsAddStudent] = useState(false);
    const addStudent = useRef();
    const urlGet = 'http://localhost:8080/QuanLyKTX_war_exploded/room?idRoom=';
    const urlGetStudent = 'http://localhost:8080/QuanLyKTX_war_exploded/api-student_manager';
    const checkPaymentRoomState = (item) => {
        if (item === 1) return 'Đã trả đủ tiền điện nước';
        else if (item === 2) return 'Còn thiếu tiền điện nước';
    };

    const checkRoomState = (item) => {
        if (item === 1) return 'Đang ở';
        else if (item === 2) return 'Đang khoá';
    };

    const addFunction = () => {
        if (room.roomState === 2) {
            alert('Phòng bị khoá, không thể thêm sinh viên!!');
            return;
        }

        if (room.availableSlots <= 0) {
            alert('Phòng đã đầy!!');
            return;
        }

        if (addStudent.current.postStudentRoom(studentCode) === true) {
            setIsAddStudent(!isAddStudent);
        }
        props.reloadStudents();
        setTimeout(() => props.reloadRoom(), 500);
        setTimeout(() => setChange(!change), 500);
    };

    const showData = (data) => {
        if (!isFirstTime) setRoom(data);
        setIsFirstTime(false);
    };

    useEffect(() => {
        fetch(urlGet + roomID)
            .then((res) => res.json())
            .then((data) => showData(data));
        axios.get(urlGetStudent, { params: { action: 'findAll' } }).then((res) => {
            setStudents(res.data);
        });
    }, [change, roomID]);

    useImperativeHandle(ref, () => ({
        update(roomId) {
            setRoomID(roomId);
            setTimeout(() => setChange(!change), 500);
        },
    }));
    const clickItem = (item) => {
        setStudentCode(item.studentCode);
    };
    return (
        <div>
            <table>
                <tbody>
                    <tr>
                        <td>Mã phòng</td>
                        <td>{room.roomCode}</td>
                    </tr>
                    <tr>
                        <td>Lượng chỗ ở tối đa</td>
                        <td>{room.maxSlots}</td>
                    </tr>
                    <tr>
                        <td>Lượng chỗ ở còn trống</td>
                        <td>{room.availableSlots}</td>
                    </tr>
                    <tr>
                        <td>Trạng thái thanh toán</td>
                        <td>{checkPaymentRoomState(room.roomPaymentState)}</td>
                    </tr>
                    <tr>
                        <td>Trạng thái phòng</td>
                        <td>{checkRoomState(room.roomState)}</td>
                    </tr>
                    <tr>
                        <td>
                            {room.roomCode !== '' && (
                                <i
                                    class={cx('fas fa-user-plus')}
                                    onClick={() => {
                                        if (room.roomCode !== '') setIsAddStudent(!isAddStudent);
                                    }}
                                >
                                    {' '}
                                    Thêm sinh viên vào phòng
                                </i>
                            )}
                        </td>
                    </tr>
                </tbody>
            </table>
            {isAddStudent && room.roomCode !== '' && (
                <Popup
                    content={<AddStudentRoom roomId={roomID} ref={addStudent}></AddStudentRoom>}
                    handleClose={() => setIsAddStudent(!isAddStudent)}
                    handleConfirm={() => addFunction()}
                />
            )}
            {isAddStudent && room.roomCode !== '' && (
                <SearchStudent data={students} showItem={clickItem}></SearchStudent>
            )}
        </div>
    );
});

export default ShowRoom;
