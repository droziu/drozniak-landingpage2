-- =====================================================
-- POPRAWKA: em-dash (—) → en-dash (–) w captionach PageSpeed,
-- width: wide/narrow → standard (oba obrazy jednakowej wielkości)
-- =====================================================

UPDATE blog_posts
SET content = (
  SELECT jsonb_build_object(
    'blocks',
    (
      SELECT jsonb_agg(
        CASE
          WHEN elem->>'id' = 's5-img-desktop' THEN
            jsonb_set(
              jsonb_set(
                jsonb_set(
                  elem,
                  '{data,alt}',
                  '"Zrzut ekranu z PageSpeed Insights – wyniki wydajności strony (desktop): szybkość, Core Web Vitals, optymalizacja"'
                ),
                '{data,caption}',
                '"PageSpeed Insights – wyniki dla wersji desktop"'
              ),
              '{data,width}',
              '"standard"'
            )
          WHEN elem->>'id' = 's5-img-mobile' THEN
            jsonb_set(
              jsonb_set(
                jsonb_set(
                  elem,
                  '{data,alt}',
                  '"Zrzut ekranu z PageSpeed Insights – wyniki wydajności strony (mobile): szybkość, Core Web Vitals, optymalizacja"'
                ),
                '{data,caption}',
                '"PageSpeed Insights – wyniki dla wersji mobilnej"'
              ),
              '{data,width}',
              '"standard"'
            )
          ELSE elem
        END
      )
      FROM jsonb_array_elements(content->'blocks') AS elem
    )
  )
)
WHERE slug = 'dlaczego-strona-nie-sprzedaje';
