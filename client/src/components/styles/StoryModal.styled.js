import styled from "styled-components";

const StyledStoryModal = styled.div`
  .modal-content {
    display: flex;
    flex-direction: row;

    .modal-details {
      position: relative;
      margin-left: 1rem;
      color: var(--font1);
      overflow: hidden;
      word-wrap: break-word;
      overflow-wrap: break-word;
      white-space: normal;
      font-size: 12px;
      flex-grow: 1;
      .modal-title {
        font-weight: 700;
        font-size: 22px;
        margin-bottom: 10px;
      }
      .user-line {
        margin-bottom: 10px;
      }
      .modal-description {
      }
      .details-btn {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-top: 10px;
        font-size: 20px;
        text-decoration: none;
        color: var(--font1);
        cursor: pointer;
        .details-icon {
          padding-top: 0;
          transition: padding-top 0.2s ease-in-out;
        }
      }
      .details-btn:hover .details-icon {
        padding-top: 10px;
      }
      .read-btn {
        position: absolute;
        bottom: 0;
        width: 98%;
      }
    }
  }
`;

export default StyledStoryModal;
