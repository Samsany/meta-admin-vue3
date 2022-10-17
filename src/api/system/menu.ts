import { defHttp } from '/@/utils/http/axios';
import { getRouteListResultModel, getMenuListResultModel, Menu, MenuVO } from './model/menuModel';

enum Api {
  GetRouteList = '/meta-admin/menu/routes',
  TreeMenuList = '/meta-admin/menu/tree-list',
  GetOrAddOrUpdateMenu = '/meta-admin/menu',
  DelMenu = '/meta-admin/menu/delete',
}

/**
 * 获取路由列表
 *
 * @description: Get user menu based on id
 */
export const getMenuList = () => {
  return defHttp.get<getRouteListResultModel>({ url: Api.GetRouteList });
};

// 查询菜单树
export const getTreeMenuList = (params?: MenuVO) => {
  return defHttp.get<getMenuListResultModel>({ url: Api.TreeMenuList, params });
};

// 查询菜单详情
export const getMenuInfo = (params: { id: number }) => {
  return defHttp.get<Menu>({ url: Api.GetOrAddOrUpdateMenu + `/${params.id}` });
};

// 新增菜单
export const addMenu = (data: Menu) => {
  return defHttp.post({ url: Api.GetOrAddOrUpdateMenu, data });
};

// 修改菜单
export const updateMenu = (data: Menu) => {
  return defHttp.put({ url: Api.GetOrAddOrUpdateMenu, data });
};

// 删除菜单
export const delMenu = (data: number[]) => {
  return defHttp.delete({ url: Api.DelMenu, data });
};
