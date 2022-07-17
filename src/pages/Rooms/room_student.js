import { forwardRef, useEffect, useImperativeHandle, useState, useRef } from 'react';
import Table from '~/components/table/table';
import React from 'react';
import DeleteStudentRoom from './delete_student_room';
import Popup from '~/components/popup/popup';
import UpdateStudentRoom from './update_student_room';
import classNames from 'classnames/bind';
import styles from './room.model.scss';
const cx = classNames.bind(styles);

const StudentRoom = forwardRef((props, ref) => {
    const urlGet = 'http://localhost:8080/QuanLyKTX_war_exploded/room/student?idRoom=';
    const [roomID, setRoomID] = useState(0);
    const [students, setStudents] = useState('');
    const [student, setStudent] = useState('');
    const [change, setChange] = useState(false);
    const [isDelete, setIsDelete] = useState(false);
    const [isUpdate, setIsUpdate] = useState(false);
    const deleteChildRef = useRef();
    const updateChildRef = useRef();

    const deleteFunction = () => {
        deleteChildRef.current.deleteStudent();
        setIsDelete(!isDelete);
        setTimeout(() => props.reloadRoom(), 500);
        setTimeout(() => setChange(!change), 500);
    };

    const updateFunction = () => {
        if (updateChildRef.current.putStudent() === true) {
            setIsUpdate(!isUpdate);
        }
        setTimeout(() => setChange(!change), 500);
    };

    const checkPaymentState = (item) => {
        if (item === 1) return 'Đã trả đủ tiền phòng';
        else if (item === 2) return 'Còn thiếu tiền phòng';
    };

    useEffect(() => {
        fetch(urlGet + roomID)
            .then((res) => res.json())
            .then((data) => setStudents(data));
    }, [change, roomID]);

    useImperativeHandle(ref, () => ({
        update(roomId) {
            setRoomID(roomId);
            setTimeout(() => setChange(!change), 500);
        },
    }));

    const customerTableHead = ['Mã sinh viên', 'Họ tên sinh viên', 'Tiền phòng còn thiếu', 'Trạng thái thanh toán'];
    const renderHead = (item, index) => <th key={index}>{item}</th>;

    const renderBody = (item, index) => (
        <tr key={index}>
            <td>{item.studentCode}</td>
            <td>{item.studentName}</td>
            <td>{item.payMoneyRemain}</td>
            <td>{checkPaymentState(item.paymentState)}</td>
            <td>
                <i
                    class={cx('fas fa-edit')}
                    onClick={() => {
                        setStudent(item);
                        setIsUpdate(!isUpdate);
                    }}
                ></i>
            </td>
            <td>
                <i
                    className={cx('fas fa-minus-circle')}
                    onClick={() => {
                        setStudent(item);
                        setIsDelete(!isDelete);
                    }}
                ></i>
            </td>
        </tr>
    );
    return (
        <div>
            <Table
                headData={customerTableHead}
                renderHead={(item, index) => renderHead(item, index)}
                bodyData={students}
                renderBody={(item, index) => renderBody(item, index)}
            />
            {isDelete && (
                <Popup
                    content={<DeleteStudentRoom studentId={student.studentId} ref={deleteChildRef}></DeleteStudentRoom>}
                    handleClose={() => setIsDelete(!isDelete)}
                    handleConfirm={() => deleteFunction()}
                />
            )}
            {isUpdate && (
                <Popup
                    content={
                        <UpdateStudentRoom
                            studentId={student.studentId}
                            payMoneyRemain={student.payMoneyRemain}
                            paymentState={student.paymentState}
                            ref={updateChildRef}
                        ></UpdateStudentRoom>
                    }
                    handleClose={() => setIsUpdate(!isUpdate)}
                    handleConfirm={() => updateFunction()}
                />
            )}
        </div>
    );
});

export default StudentRoom;
