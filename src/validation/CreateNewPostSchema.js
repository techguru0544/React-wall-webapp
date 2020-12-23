import * as Yup from 'yup';

export const CreateNewPostSchema = Yup.object().shape({
  title: Yup.string()
    .required('Title is required')
    .max(60),
  content: Yup.string()
    .required('Content is required')
    .max(200),
});
