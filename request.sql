List 
созадть лист по урл
INSERT INTO `list` (`id`, `user_id`, `url`, `public`) VALUES (NULL, NULL, 'new-list', NULL);
получить лист по урл
SELECT `id`, `user_id`, `url`, `public` FROM `list` WHERE `url` = 'new-list'
получить все листы по пользователям
SELECT `id`, `user_id`, `url`, `public` FROM `list` WHERE `user_id` = 1

items
получть items по id листа
SELECT `id`, `value`, `lidt_id`, `count` FROM `items` WHERE `lidt_id` = 1
изменить лист
UPDATE `items` SET `value`='бфнан', `count`=2 WHERE `lidt_id` = 1 AND `id` = 1
