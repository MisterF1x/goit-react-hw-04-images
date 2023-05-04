import {
  FormSearch,
  SearchFormBtn,
  SearchFormInput,
  SearchFormLabel,
  SearchHead,
} from './Seachbar.styled';
import { Formik } from 'formik';
import toast from 'react-hot-toast';
import PropTypes from 'prop-types';
import { ERROR_MSG, toastErrStyle } from 'components/constant';

export const Searchbar = ({ onSubmit, isSubmitting, initial }) => {
  const handleFormSubmit = ({ query }, { resetForm }) => {
    const trimedQuery = query.trim();
    if (!trimedQuery) return toast.error(ERROR_MSG['empty'], toastErrStyle);
    resetForm();
    onSubmit(query);
  };
  return (
    <SearchHead>
      <Formik initialValues={{ query: initial }} onSubmit={handleFormSubmit}>
        <FormSearch>
          <SearchFormBtn type="submit" disabled={isSubmitting}>
            <SearchFormLabel>Search</SearchFormLabel>
          </SearchFormBtn>
          <SearchFormInput
            type="text"
            name="query"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
        </FormSearch>
      </Formik>
    </SearchHead>
  );
};
Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  isSubmitting: PropTypes.bool.isRequired,
  initial: PropTypes.string.isRequired,
};
