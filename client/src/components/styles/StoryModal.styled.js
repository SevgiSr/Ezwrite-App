import styled from "styled-components";

const StyledStoryModal = styled.div`
  .modal-content-custom {
    display: flex;
    flex-direction: row;

    .modal-main {
      .metadata {
        margin-top: 10px;
        color: var(--font2);
      }

      .cover {
        position: relative;
        .details-btn {
          position: absolute;
          background-color: var(--background5);
          left: 0;
          right: 0;
          bottom: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 1rem;
          font-size: 18px;
          text-decoration: none;
          color: var(--font1);
          cursor: pointer;
          .details-icon {
            padding-left: 0;
            transition: padding-left 0.2s ease-in-out;
          }
        }
        .details-btn:hover .details-icon {
          padding-left: 10px;
        }
      }
    }

    .modal-details {
      display: flex;
      flex-direction: column;
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

      .read-btn {
        margin-top: auto;
        width: 98%;
      }
    }
  }
`;

export default StyledStoryModal;
