import * as Yup from 'yup';

export const AddCreateNewCommentOnPostSchema = Yup.object().shape({
  comment_content: Yup.string()
    .required('Comment is required')
    .max(200),
});
