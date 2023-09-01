//我的影片列表API//

import pool from '../config/db.js'

export default async function getVideo(req, res) {
  try {
    const query = `SELECT
    fitvideos.VideoID,
      fitvideos.Title,
      fitvideos.vidthumbnail,
      fitvideos.Description,
      fitvideos.musclegroupID,
      muscle_group.muscleName,
      classmultipack.classname,
      classmultipack.classprice,
      classmultipack.classmultipackID,
      classmultipack.multipackgroup_id,
      multipack_group.multipackgroup_name
    FROM
    fitvideos
INNER JOIN
    muscle_group ON fitvideos.musclegroupID = muscle_group.musclegroupID
INNER JOIN
    classmultipack ON fitvideos.classmultipackID = classmultipack.classmultipackID
INNER JOIN
    multipack_group ON classmultipack.multipackgroup_id = multipack_group.multipackgroup_id;`
    const [rows, fields] = await pool.query(query)
    res.status(200).json({ video: rows })
    // res.status(200).json(rows)
  } catch (error) {
    console.error('獲取數據出錯：', error)
    res.status(500).json({ error: '獲取數據出錯' })
  }
}
