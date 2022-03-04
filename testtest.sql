select row_to_json(stys) as styles from 
  (select s.id, s.name, s.sale_price, s.original_price, s.default_style, 
    (select json_agg(pics) from 
      (select photos.url, photos.thumbnail_url from photos where "styleId"= s.id
      ) pics
    ) as photos from styles as s
  ) stys 
where productId=${productId}