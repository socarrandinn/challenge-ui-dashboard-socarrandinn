import React, { ReactNode } from 'react';

interface PermissionContainerProps {
  children: ReactNode;
  hasPermission: boolean;
  fallback?: ReactNode;
}

const PermissionContainer: React.FC<PermissionContainerProps> = ({
  children,
  hasPermission,
  fallback = null,
}) => {
  if (!hasPermission) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
};

export default PermissionContainer;
