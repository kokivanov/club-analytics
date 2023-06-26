CREATE view avg_per_week as
SELECT avg(avg_per_c), club_id from (SELECT avg(vcn) avg_per_c, club_id, visitor_id from (SELECT count(id) vcn, visitor_id, club_id, EXTRACT(week from start_time) w, EXTRACT(year from start_time) y from visit
GROUP BY club_id, visitor_id, w, y) tl
GROUP BY visitor_id, club_id, y) tb
GROUP by club_id;

CREATE view avg_time as
SELECT club_id, to_char(cast(avg(cast(start_time as time)) as time), 'HH24:MI') as avg_time FROM visit GROUP BY club_id;

CREATE view week_stats as
select avg(cn) avg_visits, club_id, dow as wday from (select count(id) as cn, club_id, 
    EXTRACT(dow from start_time) dow, 
    EXTRACT(day from start_time) d, 
    EXTRACT(MONTH from start_time) m, 
    EXTRACT(YEAR from start_time) y 
        from visit GROUP BY club_id, d, m, y, dow) tl
GROUP by club_id, dow;

CREATE OR REPLACE function visitors_of_club(cl_id int) returns table (
    c_id Int,
    id int,
    vage int
) AS $$
begin
return query select vs.club_id, age, v.id 
    FROM visitor v INNER JOIN visit vs on vs.visitor_id = v.id 
    where club_id = cl_id GROUP BY vs.club_id, v.id, v.age;
end;
$$ language plpgsql;

CREATE OR REPLACE VIEW club_visitors
 AS
 SELECT club.id,
    voc.vage,
    voc.id AS vid
   FROM club
     INNER JOIN visitors_of_club(club.id) voc(c_id, id, vage) ON voc.c_id = club.id;

CREATE view age_stats as
select age, tl.club_id, count(vid) FROM (
    SELECT id as club_id, '12-17' as age, vid FROM club_visitors cv WHERE cv.vage <= 17
    UNION 
    SELECT id as club_id, '18-24' as age, vid FROM club_visitors cv WHERE cv.vage <= 24 and cv.vage > 17
    UNION 
    SELECT id as club_id, '25-31' as age, vid FROM club_visitors cv WHERE cv.vage <= 31 and cv.vage > 24
    UNION 
    SELECT id as club_id, '32-37' as age, vid FROM club_visitors cv WHERE cv.vage <= 37 and cv.vage > 31
    UNION 
    SELECT id as club_id, '38-45' as age, vid FROM club_visitors cv WHERE cv.vage <= 45 and cv.vage > 37
    UNION 
    SELECT id as club_id, '46-55' as age, vid FROM club_visitors cv WHERE cv.vage <= 55 and cv.vage > 45
    UNION 
    SELECT id as club_id, '56-70' as age, vid FROM club_visitors cv WHERE cv.vage <= 70 and cv.vage > 55
    UNION 
    SELECT id as club_id, '71+' as age, vid FROM club_visitors cv WHERE cv.vage > 70
    ) tl
GROUP BY tl.club_id, age;

