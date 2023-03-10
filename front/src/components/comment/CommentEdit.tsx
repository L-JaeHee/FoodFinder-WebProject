import { useFormContext } from 'react-hook-form';
import { Comment } from '../recipeDetail/RecipeComment';
import useEditComment from '../../hooks/Comment/useEditComment';
import styled from 'styled-components';

interface CommentEdit {
  comment: Comment;
  setIsEdit: React.Dispatch<React.SetStateAction<boolean>>;
  recipeId: string;
}

const CommentEdit = ({ comment, setIsEdit, recipeId }: CommentEdit) => {
  const { register, handleSubmit } = useFormContext();
  const { mutate } = useEditComment(recipeId);
  const { commentId } = comment;

  const onSubmit = handleSubmit(({ comment }) => {
    mutate({ commentId, comment });
    setIsEdit(false);
  });

  return (
    <InputForm onSubmit={onSubmit}>
      <Input
        defaultValue={comment.content}
        as="textarea"
        {...register('comment')}
      />

      <ButtonContainer>
        <SubitButton type="submit">수정</SubitButton>
        <CancelButton type="button" onClick={() => setIsEdit(false)}>
          취소
        </CancelButton>
      </ButtonContainer>
    </InputForm>
  );
};

const InputForm = styled.form`
  ${({ theme }) => theme.mixins.flexBox('row', 'center', 'start')};
  gap: 2rem;
  width: 100%;
`;

const Input = styled.input`
  width: 80%;
  height: 5rem;
  border-radius: 1rem;
  border: 1px solid ${({ theme }) => theme.darkGrey};
`;
const ButtonContainer = styled.section`
  ${({ theme }) => theme.mixins.flexBox}
`;
const SubitButton = styled.button`
  ${({ theme }) => theme.mixins.flexBox()};
  width: 5rem;
  height: 5rem;
  border-radius: 1rem;
  border: 1px solid ${({ theme }) => theme.darkGrey};
`;
const CancelButton = styled.button`
  ${({ theme }) => theme.mixins.flexBox()};
  width: 5rem;
  height: 5rem;
  border-radius: 1rem;
  border: 1px solid ${({ theme }) => theme.darkGrey};
`;
export default CommentEdit;
