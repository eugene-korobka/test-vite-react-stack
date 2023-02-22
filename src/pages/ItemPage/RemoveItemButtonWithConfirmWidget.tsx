import { useCallback } from "react";
import { useNavigate } from "react-router-dom";

import { RemoveItemButtonWithConfirmModal } from "components/RemoveItemButtonWithConfirmModal";

export const RemoveItemButtonWithConfirmWidget = () => {
  const navigate = useNavigate();

  const onRemove = useCallback(() => {
    navigate('/items-list');
  }, [navigate]);

  return (
    <RemoveItemButtonWithConfirmModal onRemove={onRemove} />
  );
};

