--select row_to_json(stys) as styles from 
--  (select s.id, s.name, s.sale_price, s.original_price, s.default_style, 
--    (select json_agg(pics) from 
--      (select photos.url, photos.thumbnail_url from photos where "styleId"= s.id
--      ) pics
--    ) as photos from styles as s
--  ) stys 
--where productId=${productId}

--select json_build_object('product_id', ${productId}, 'results', INNERTHING) from 




SELECT json_build_object('product_id', ${productId}, 'results', array_agg(row_to_json(main)))
  FROM (
    SELECT s.id, s.name, s.sale_price, s.original_price, s.default_style, 
    (
      SELECT array_to_json(array_agg(row_to_json(sub)))
      FROM (
        SELECT ph.thumbnail_url, ph.url 
        FROM photos ph 
        WHERE s.id = styleId
      ) sub
    ) as photos, (SELECT json_object_agg(sk.id, json_build_object('quantity', s.quantity, 'size', s.size)) as skus FROM skus s WHERE s.style_id = 5)
    FROM styles s
    WHERE s.product_id = ${productId}
    ) main