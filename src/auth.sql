/*
 Navicat Premium Data Transfer

 Source Server         : docker
 Source Server Type    : MySQL
 Source Server Version : 50725
 Source Host           : 127.0.0.1:3306
 Source Schema         : EBC-Customs-ERP

 Target Server Type    : MySQL
 Target Server Version : 50725
 File Encoding         : 65001

 Date: 12/09/2019 20:48:47
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for authorities
-- ----------------------------
DROP TABLE IF EXISTS `authorities`;
CREATE TABLE `authorities`  (
  `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '权限名称',
  `uri` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '权限name',
  `description` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT '' COMMENT '权限描述',
  `created_at` timestamp(0) NULL DEFAULT NULL,
  `updated_at` timestamp(0) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `authorities_uri_unique`(`uri`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 23 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci COMMENT = '权限表' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of authorities
-- ----------------------------
INSERT INTO `authorities` VALUES (7, '获取后台用户列表', 'user.index', '获取后台用户列表', '2019-04-03 03:15:12', '2019-04-03 03:15:12');
INSERT INTO `authorities` VALUES (8, '添加后台用户', 'user.store', '添加后台用户', '2019-04-03 03:15:33', '2019-04-03 03:15:33');
INSERT INTO `authorities` VALUES (9, '修改后台用户', 'user.update', '修改后台用户', '2019-04-03 03:15:53', '2019-04-03 03:15:53');
INSERT INTO `authorities` VALUES (10, '获取后台菜单列表', 'menu.index', '获取后台菜单列表', '2019-04-03 03:20:23', '2019-04-03 03:20:23');
INSERT INTO `authorities` VALUES (11, '添加后台菜单', 'menu.store', '添加后台菜单', '2019-04-03 03:20:43', '2019-04-03 03:20:43');
INSERT INTO `authorities` VALUES (12, '修改后台菜单', 'menu.update', '修改后台菜单', '2019-04-03 03:21:01', '2019-04-03 03:21:01');
INSERT INTO `authorities` VALUES (13, '删除后台菜单', 'menu.destroy', '删除后台菜单', '2019-04-03 03:21:31', '2019-04-03 03:21:31');
INSERT INTO `authorities` VALUES (14, '获取后台权限列表', 'authority.index', '获取后台权限列表', '2019-04-03 03:23:21', '2019-04-03 03:23:21');
INSERT INTO `authorities` VALUES (15, '添加后台权限', 'authority.store', '添加后台权限', '2019-04-03 03:23:49', '2019-04-03 03:23:49');
INSERT INTO `authorities` VALUES (16, '修改后台权限', 'authority.update', '修改后台权限', '2019-04-03 03:24:44', '2019-04-03 03:24:44');
INSERT INTO `authorities` VALUES (17, '删除后台权限', 'authority.destroy', '删除后台权限', '2019-04-03 03:25:02', '2019-04-03 03:25:02');
INSERT INTO `authorities` VALUES (18, '获取后台部门列表', 'role.index', '获取后台部门列表', '2019-04-03 03:27:47', '2019-04-03 03:27:47');
INSERT INTO `authorities` VALUES (19, '添加后台部门', 'role.store', '添加后台部门', '2019-04-03 03:28:11', '2019-04-03 03:28:11');
INSERT INTO `authorities` VALUES (20, '修改后台部门', 'role.update', '修改后台部门', '2019-04-03 03:28:35', '2019-04-03 03:28:35');
INSERT INTO `authorities` VALUES (21, '删除后台部门', 'role.destroy', '删除后台部门', '2019-04-03 03:29:03', '2019-04-03 03:29:03');
INSERT INTO `authorities` VALUES (22, '获取菜单所关联权限', 'role.menu_authority', '部门添加和修改时获取菜单所关联权限', '2019-04-03 08:05:31', '2019-04-03 08:05:31');

-- ----------------------------
-- Table structure for menu_authority
-- ----------------------------
DROP TABLE IF EXISTS `menu_authority`;
CREATE TABLE `menu_authority`  (
  `menu_id` int(10) UNSIGNED NOT NULL,
  `authority_id` int(10) UNSIGNED NOT NULL,
  PRIMARY KEY (`menu_id`, `authority_id`) USING BTREE,
  INDEX `menu_authority_authority_id_foreign`(`authority_id`) USING BTREE,
  CONSTRAINT `menu_authority_authority_id_foreign` FOREIGN KEY (`authority_id`) REFERENCES `authorities` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `menu_authority_menu_id_foreign` FOREIGN KEY (`menu_id`) REFERENCES `menus` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of menu_authority
-- ----------------------------
INSERT INTO `menu_authority` VALUES (7, 7);
INSERT INTO `menu_authority` VALUES (7, 8);
INSERT INTO `menu_authority` VALUES (7, 9);
INSERT INTO `menu_authority` VALUES (10, 10);
INSERT INTO `menu_authority` VALUES (10, 11);
INSERT INTO `menu_authority` VALUES (10, 12);
INSERT INTO `menu_authority` VALUES (10, 13);
INSERT INTO `menu_authority` VALUES (9, 14);
INSERT INTO `menu_authority` VALUES (9, 15);
INSERT INTO `menu_authority` VALUES (9, 16);
INSERT INTO `menu_authority` VALUES (9, 17);
INSERT INTO `menu_authority` VALUES (8, 18);
INSERT INTO `menu_authority` VALUES (8, 19);
INSERT INTO `menu_authority` VALUES (8, 20);
INSERT INTO `menu_authority` VALUES (8, 21);
INSERT INTO `menu_authority` VALUES (8, 22);

-- ----------------------------
-- Table structure for menus
-- ----------------------------
DROP TABLE IF EXISTS `menus`;
CREATE TABLE `menus`  (
  `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `parent_id` int(10) UNSIGNED NOT NULL DEFAULT 0 COMMENT '上级菜单',
  `name` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '菜单名称',
  `url` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '菜单URL',
  `sort` tinyint(3) UNSIGNED NOT NULL COMMENT '排序',
  `description` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT '' COMMENT '权限描述',
  `created_at` timestamp(0) NULL DEFAULT NULL,
  `updated_at` timestamp(0) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 12 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci COMMENT = '菜单表' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of menus
-- ----------------------------
INSERT INTO `menus` VALUES (5, 0, '首页', 'home', 1, '管理后台首页', '2019-04-03 02:47:33', '2019-04-03 02:47:33');
INSERT INTO `menus` VALUES (6, 0, '后台用户', 'authorities', 98, '后台用户管理', '2019-04-03 02:48:14', '2019-04-03 02:48:14');
INSERT INTO `menus` VALUES (7, 6, '用户管理', 'authorities.user', 1, '用户管理', '2019-04-03 02:48:40', '2019-04-03 02:48:40');
INSERT INTO `menus` VALUES (8, 6, '部门管理', 'authorities.role', 2, '部门管理', '2019-04-03 02:49:05', '2019-04-26 09:22:47');
INSERT INTO `menus` VALUES (9, 6, '权限管理', 'authorities.authority', 4, '权限管理', '2019-04-03 02:49:29', '2019-04-26 09:23:06');
INSERT INTO `menus` VALUES (10, 6, '菜单管理', 'authorities.menu', 3, '菜单管理', '2019-04-03 02:50:53', '2019-04-26 09:22:56');
INSERT INTO `menus` VALUES (11, 0, '个人中心', 'profile', 99, '个人中心', '2019-04-09 01:55:40', '2019-04-09 01:55:40');

-- ----------------------------
-- Table structure for migrations
-- ----------------------------
DROP TABLE IF EXISTS `migrations`;
CREATE TABLE `migrations`  (
  `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `migration` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `batch` int(11) NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 2 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of migrations
-- ----------------------------
INSERT INTO `migrations` VALUES (1, '2019_04_18_031127_create_auth_table', 1);

-- ----------------------------
-- Table structure for role_authority
-- ----------------------------
DROP TABLE IF EXISTS `role_authority`;
CREATE TABLE `role_authority`  (
  `authority_id` int(10) UNSIGNED NOT NULL,
  `role_id` int(10) UNSIGNED NOT NULL,
  PRIMARY KEY (`authority_id`, `role_id`) USING BTREE,
  INDEX `role_authority_role_id_foreign`(`role_id`) USING BTREE,
  CONSTRAINT `role_authority_authority_id_foreign` FOREIGN KEY (`authority_id`) REFERENCES `authorities` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `role_authority_role_id_foreign` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of role_authority
-- ----------------------------
INSERT INTO `role_authority` VALUES (7, 1);
INSERT INTO `role_authority` VALUES (8, 1);
INSERT INTO `role_authority` VALUES (9, 1);
INSERT INTO `role_authority` VALUES (10, 1);
INSERT INTO `role_authority` VALUES (11, 1);
INSERT INTO `role_authority` VALUES (12, 1);
INSERT INTO `role_authority` VALUES (13, 1);
INSERT INTO `role_authority` VALUES (14, 1);
INSERT INTO `role_authority` VALUES (15, 1);
INSERT INTO `role_authority` VALUES (16, 1);
INSERT INTO `role_authority` VALUES (17, 1);
INSERT INTO `role_authority` VALUES (18, 1);
INSERT INTO `role_authority` VALUES (19, 1);
INSERT INTO `role_authority` VALUES (20, 1);
INSERT INTO `role_authority` VALUES (21, 1);
INSERT INTO `role_authority` VALUES (22, 1);
INSERT INTO `role_authority` VALUES (8, 2);
INSERT INTO `role_authority` VALUES (11, 2);
INSERT INTO `role_authority` VALUES (12, 2);
INSERT INTO `role_authority` VALUES (19, 2);
INSERT INTO `role_authority` VALUES (20, 2);

-- ----------------------------
-- Table structure for role_menu
-- ----------------------------
DROP TABLE IF EXISTS `role_menu`;
CREATE TABLE `role_menu`  (
  `menu_id` int(10) UNSIGNED NOT NULL,
  `role_id` int(10) UNSIGNED NOT NULL,
  PRIMARY KEY (`menu_id`, `role_id`) USING BTREE,
  INDEX `role_menu_role_id_foreign`(`role_id`) USING BTREE,
  CONSTRAINT `role_menu_menu_id_foreign` FOREIGN KEY (`menu_id`) REFERENCES `menus` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `role_menu_role_id_foreign` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of role_menu
-- ----------------------------
INSERT INTO `role_menu` VALUES (5, 1);
INSERT INTO `role_menu` VALUES (6, 1);
INSERT INTO `role_menu` VALUES (7, 1);
INSERT INTO `role_menu` VALUES (8, 1);
INSERT INTO `role_menu` VALUES (9, 1);
INSERT INTO `role_menu` VALUES (10, 1);
INSERT INTO `role_menu` VALUES (11, 1);
INSERT INTO `role_menu` VALUES (6, 2);
INSERT INTO `role_menu` VALUES (7, 2);
INSERT INTO `role_menu` VALUES (8, 2);
INSERT INTO `role_menu` VALUES (9, 2);
INSERT INTO `role_menu` VALUES (10, 2);

-- ----------------------------
-- Table structure for roles
-- ----------------------------
DROP TABLE IF EXISTS `roles`;
CREATE TABLE `roles`  (
  `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '角色名称',
  `description` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT '' COMMENT '角色描述',
  `created_at` timestamp(0) NULL DEFAULT NULL,
  `updated_at` timestamp(0) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 3 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci COMMENT = '角色表' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of roles
-- ----------------------------
INSERT INTO `roles` VALUES (1, '超级管理员', '超级管理员', '2019-09-10 09:17:17', '2019-09-10 09:17:19');
INSERT INTO `roles` VALUES (2, '测试用的', '测试用的', '2019-09-12 07:23:39', '2019-09-12 07:23:39');

-- ----------------------------
-- Table structure for users
-- ----------------------------
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users`  (
  `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `role_id` int(10) UNSIGNED NULL DEFAULT NULL COMMENT '所属角色',
  `name` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '姓名',
  `phone` char(11) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '电话号码',
  `email` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '邮件',
  `password` varchar(60) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '密码',
  `birthday` date NULL DEFAULT NULL COMMENT '生日',
  `entryday` date NULL DEFAULT NULL COMMENT '入职日期',
  `sex` enum('man','women') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'man' COMMENT '性别',
  `status` enum('on','off') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'off' COMMENT '状态',
  `created_at` timestamp(0) NULL DEFAULT NULL,
  `updated_at` timestamp(0) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `users_role_id_foreign`(`role_id`) USING BTREE,
  CONSTRAINT `users_role_id_foreign` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE = InnoDB AUTO_INCREMENT = 5 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci COMMENT = '用户表' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of users
-- ----------------------------
INSERT INTO `users` VALUES (1, 1, '苍老师1133', '18620341552', 'cang@av.com', '$2y$10$1K1iVCZ0NzyCxAGu9EiXk.HfNXXp6U7n/gz4nTi2.7qK0sIzWotYW', '2019-04-25', '2018-04-03', 'women', 'on', '2019-04-03 07:34:28', '2019-09-11 06:42:10');
INSERT INTO `users` VALUES (2, 1, '波多老师', '18620310998', 'luffyzhao@vip.126.com', '$2y$10$.rCkUAoDoJECQ8QLHeus..zYgEZ6kCpTD644E6fR/V1x6yAABzuJ2', '2019-09-11', '2019-09-11', 'man', 'on', '2019-09-11 01:01:17', '2019-09-11 01:01:17');
INSERT INTO `users` VALUES (3, 1, '小顺娜子', '15889785446', 'lufhzin@av.com', '$2y$10$bflGb.R3EBOE4zSl1Gh5CeKQnQA9CvRPHhezJRla9e.HyWJJ4k7fa', '2019-09-11', '2019-09-11', 'man', 'on', '2019-09-11 02:15:57', '2019-09-11 02:15:57');
INSERT INTO `users` VALUES (4, 1, '无理小家伙', '18987283331', 'wuli@a.com', '$2y$10$dCBv66XKHuoEQFWHnqs.8OA3BM/PKuFko4yYhfrkwjFMAKE9/qhxO', '2019-09-11', '2019-09-11', 'man', 'on', '2019-09-11 06:25:53', '2019-09-11 06:25:53');

SET FOREIGN_KEY_CHECKS = 1;
