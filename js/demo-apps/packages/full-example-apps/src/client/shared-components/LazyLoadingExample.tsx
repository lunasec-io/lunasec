import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import React, { lazy, Suspense } from 'react';

const LazilyLoadedContent = lazy(() => import(/* webpackChunkName: "LazilyLoadedContent" */ './LazilyLoadedContent'));

const Spinner = () => (<div>LOADING...</div>);

export const LazyLoadingExample: React.FunctionComponent = () => (
  <Card>
    <CardHeader title='Lazy Loading Example' />
    <CardContent>
      <Suspense fallback={<Spinner />}>
        <LazilyLoadedContent />
      </Suspense>
    </CardContent>
  </Card>
);
