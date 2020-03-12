import { Link } from 'umi';
import { connect } from 'dva';
import { Result, Button } from 'antd';
import pathRegexp from 'path-to-regexp';
import React, { Component } from 'react';
import { Route } from '@/models/connect';
import { CurrentUser } from '@/models/user';
import { ConnectState } from '@/models/connect';
import { isString } from 'lodash';

@connect(({ user: { currentUser } }: ConnectState) => {
  return {
    currentUser,
  };
})
export default class AuthorizedLayout extends Component<any, any> {
  renderByAuthority = (currentUser: CurrentUser, authorities?: string | string[]) => {
    const { children } = this.props;

    const currentUserType = 'admin'; // currentUser.role.type

    if (!authorities) {
      return children;
    }

    const authoritiesArray = isString(authorities) ? [authorities] : authorities;
    if (new Set(authoritiesArray).has(currentUserType)) {
      return children;
    }

    return noMatch;
  };

  render() {
    const { route, location, currentUser } = this.props;
    const authorized = getAuthorityFromRouter(route.routes, location.pathname || '/') || {
      authority: undefined,
    };

    return <div>{this.renderByAuthority(currentUser, authorized.authority)}</div>;
  }
}

const noMatch = (
  <Result
    status="404"
    title="403"
    subTitle="你没有权限使用该页面"
    extra={
      <Button type="primary">
        <Link to="/user/login">Go Login</Link>
      </Button>
    }
  />
);

function getAuthorityFromRouter<T extends Route>(
  router: T[] = [],
  pathname: string,
): T | undefined {
  const authority = router.find(
    ({ routes, path = '/' }) =>
      (path && pathRegexp(path).exec(pathname)) ||
      (routes && getAuthorityFromRouter(routes, pathname)),
  );
  if (authority) return authority;
  return undefined;
}
