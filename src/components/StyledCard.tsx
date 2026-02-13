import styled from "@emotion/styled";

/**
 * Emotion styled component (required: at least one beyond MUI sx).
 * Reusable card surface with consistent padding and responsive behavior.
 */
export const StyledCard = styled.div`
  background: #272727;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12);
  padding: 16px;
  transition: box-shadow 0.2s ease;

  &:hover {
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  }

  @media (min-width: 600px) {
    padding: 20px;
  }

  @media (min-width: 960px) {
    padding: 24px;
  }
`;
