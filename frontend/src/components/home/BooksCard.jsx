import { Link } from 'react-router-dom';
import { PiBookOpenTextLight } from 'react-icons/pi';
import { BiUserCircle } from 'react-icons/bi';
import { AiOutlineEdit } from 'react-icons/ai';
import { BsInfoCircle } from 'react-icons/bs';
import { MdOutlineDelete } from 'react-icons/md';

const BooksCard = ({ books = [] }) => {
  if (!books || books.length === 0) {
    return (
      <div className='flex justify-center items-center'>
        <p className='text-xl text-gray-500'>No books found</p>
      </div>
    );
  }

  return (
    <div className='grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4'>
      {books.map((book) => (
        <div
          key={book._id}
          className='border-2 border-gray-500 rounded-lg px-4 py-2 m-4 relative hover:shadow-xl'
        >
          <h2 className='absolute top-1 right-2 px-4 py-1 bg-red-300 rounded-lg'>
            {book.publishYear}
          </h2>
          <div className='flex justify-start items-center gap-x-2'>
            <PiBookOpenTextLight className='text-red-300 text-2xl' />
            <h2 className='my-1'>{book.title}</h2>
          </div>
          <div className='flex justify-start items-center gap-x-2'>
            <BiUserCircle className='text-red-300 text-2xl' />
            <h2 className='my-1'>{book.author}</h2>
          </div>
          <div className='flex justify-between items-center gap-x-2 mt-4 p-4'>
            <Link to={`/books/details/${book._id}`}>
              <BsInfoCircle className='text-2xl text-green-800 hover:text-black' />
            </Link>
            <Link to={`/books/edit/${book._id}`}>
              <AiOutlineEdit className='text-2xl text-yellow-600 hover:text-black' />
            </Link>
            <Link to={`/books/delete/${book._id}`}>
              <MdOutlineDelete className='text-2xl text-red-600 hover:text-black' />
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BooksCard;
