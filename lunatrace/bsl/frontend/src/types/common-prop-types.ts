import React from 'react';

export type FCWithChildren<T = any> = React.FC<{ children: React.ReactNode } & T>;
