import Pagination from 'rc-pagination';

import './pagination-comp.scss';
import 'rc-pagination/assets/index.css';
import { FC } from 'react';

interface IPaginationProps {
	currentPage: number;
	totalItems: number;
	handleChange: (pageNumber: number) => void;
	itemsPerPage: number;
}

const PaginationComp: FC<IPaginationProps> = ({ currentPage, totalItems, handleChange, itemsPerPage }) => {
	return (
		<div className='pagination__wrapper'>
			<Pagination current={currentPage} total={totalItems} pageSize={itemsPerPage} onChange={handleChange} />
		</div>
	);
};

export default PaginationComp;
