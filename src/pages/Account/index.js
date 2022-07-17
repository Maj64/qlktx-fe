import classNames from 'classnames/bind';
import TableComp from '~/components/TableComp/TableComp';
import styles from './Account.model.scss';

const cx = classNames.bind(styles);

function Account() {
    return (
        <div className={cx('wrapper')}>
            <TableComp />
        </div>
    );
}

export default Account;
