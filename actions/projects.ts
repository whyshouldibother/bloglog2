import pool from '@/lib/db'
import {projectListType, projectViewType} from '@/types/projects';
export async function getProjectList(){
    const result = await pool.query<projectListType>(`select p.title from projects p order by p."lastUpdate" desc`)
    return result.rows
}
export async function getProjectView() {
    const result = await pool.query<projectViewType>(`
    SELECT
      p.id,
      p.title,
      p.description,

      COALESCE(l.links, '[]') AS links,
      COALESCE(t.completed, '[]') AS "completedTodos",
      COALESCE(t.pending, '[]') AS "pendingTodos",
        COALESCE (v.versions, '[]') as versions
    FROM projects p
    LEFT JOIN LATERAL (
      SELECT json_agg(
        jsonb_build_object(
          'title', l.title,
          'url', l.url
        )
      ) AS links
      FROM links l
      WHERE l.projectid = p.id
    ) l ON true
  left join lateral(
            select json_agg(jsonb_build_object('id', v.id, 'versionid', array_to_string(v.versionid, '.'), 'creation', v.creation, 'description',v.description,'open',v.open, 'notes', coalesce((select json_agg(json_build_object('id', n.id, 'note', n.note)) from versionnotes n where n.versionid = v.id), '[]'::json), 'tags',coalesce((select json_agg(jsonb_build_object('title', t.title, 'color', t.color) order by t.\"priorityOrder\") from tagged tg left join tags t on t.id = tg.tagid where tg.versionid = v.id ), '[]'::json), 'circuit', coalesce((select jsonb_strip_nulls(jsonb_build_object('imageid', c.imageid, 'alt', c.alt)) from circuitimages c where c.versionid = v.id))) order by v.versionid) as versions from versions v where v.projectid = p.id) v on true

    LEFT JOIN LATERAL (
      SELECT
        COALESCE(
          json_agg(
            jsonb_build_object(
              'id', t.id,
              'todo', t.todo,
              'status', t.status
            )
          ) FILTER (WHERE t.status = true),
          '[]'
        ) AS completed,

        COALESCE(
          json_agg(
            jsonb_build_object(
              'id', t.id,
              'todo', t.todo,
              'status', t.status
            )
          ) FILTER (WHERE t.status = false),
          '[]'
        ) AS pending
            FROM todolist t
      WHERE t.projectid = p.id
    ) t ON true

    ORDER BY p."lastUpdate" DESC
  `);

    return result.rows;
}
