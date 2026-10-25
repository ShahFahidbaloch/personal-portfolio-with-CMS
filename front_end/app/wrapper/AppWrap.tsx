import React from 'react';
import { NavigationDots, SocialMedia } from '../components';

const AppWrap = <P extends object>(
  Component: React.ComponentType<P>,
  idName: string,
  classNames: string
) => function HOC(props: P) {
  return (
    <div id={idName} className={`app__container bg-[#f5f5f7] dark:bg-[#000000] transition-colors duration-300 w-full max-w-full overflow-x-hidden ${classNames}`}>
      <SocialMedia />
      <div className="app__wrapper app__flex w-full max-w-full overflow-x-hidden">
        <Component {...props} />
      </div>
      <NavigationDots active={idName} />
    </div>
  );
};

export default AppWrap;
