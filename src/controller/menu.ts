import type { Context } from 'koa';
import MenuService from '../service/menu';

export default class MenuController {
  /** 获取所有菜单列表 */
  public static async menuList(ctx: Context) {
    const res = await MenuService.menuList();
    ctx.result = res;
  }
}
