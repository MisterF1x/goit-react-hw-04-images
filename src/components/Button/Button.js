import { LoadBtn } from './Button.styled';
import PropTypes from 'prop-types';

export const LoadButton = ({ onClick }) => {
  return (
    <LoadBtn onClick={onClick} type="button" aria-label="load more">
      Load more
    </LoadBtn>
  );
};
LoadButton.propTypes = {
  onClick: PropTypes.func.isRequired,
};
