import styled from 'styled-components';
import { useFormContext } from 'react-hook-form';
import CreateRecipeInfo from './main/CreateRecipeInfo';
import CreateRecipeIngredient from './ingredient/CreateRecipeIngredient';
import CreateRecipeInstruction from './instruction/CreateRecipeInstruction';
import { CreateRecipeContainerStyle } from '../../styles/createRecipeStyle';

const CreateRecipeForm = () => {
  const { handleSubmit } = useFormContext();
  return (
    <CreateRecipeFormConatiner
      onSubmit={handleSubmit((data) => console.log(data))}
    >
      <CreateRecipeInfo />
      <CreateRecipeIngredient />
      <CreateRecipeInstruction />
      <CreateRecipeFormButtonContainer>
        <CreatRecipeSubmitButton type="submit">저장</CreatRecipeSubmitButton>
        <CreateRecipeCancleButton type="button">취소</CreateRecipeCancleButton>
      </CreateRecipeFormButtonContainer>
    </CreateRecipeFormConatiner>
  );
};

export default CreateRecipeForm;

const CreateRecipeFormConatiner = styled.form`
  ${({ theme }) => theme.mixins.flexBox('column')};
  margin: ${({ theme }) => theme.spacingLarge} 0;
  gap: ${({ theme }) => theme.spacingRegular};
`;

const CreateRecipeFormButtonContainer = styled.section`
  ${CreateRecipeContainerStyle};
  ${({ theme }) => theme.mixins.flexBox()};
  gap: ${({ theme }) => theme.spacingLarge};
`;

const CreatRecipeSubmitButton = styled.button`
  ${({ theme }) => theme.mixins.button()}
  background-color: ${({ theme }) => theme.themeColor};
  color: ${({ theme }) => theme.mainWhite};
`;

const CreateRecipeCancleButton = styled.button`
  ${({ theme }) => theme.mixins.button()};
`;
