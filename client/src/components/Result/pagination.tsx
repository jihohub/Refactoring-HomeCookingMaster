import React from 'react'

const PaginationCompo = (postsPerPage=1, totalPosts=1 ) => {
    const pageNumbers = [];

    for(let i=1;i<=Math.ceil(totalPosts / postsPerPage); i++){
        pageNumbers.push(i);
    }
    return (
        <nav>
            {/* <ul className="pagination">
                {pageNumbers.map(number => (
                    <li key={number} className="page-item">
                        <a onClick = {() => paginate(number)}href="!#" className="page-link">
                            {number}
                        </a>
                    </li>
                ))}
            </ul> */}
        </nav>
    )
}


export default PaginationCompo;