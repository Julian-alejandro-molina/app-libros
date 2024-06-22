
const librosMapper = (libros) => {
    return libros.map((libro) => {
        return {
          titulo: libro.title,
          autor: libro.authors[0]?.name,
          fechaLanzamiento: libro.first_publish_year
        }
    })
}

export { librosMapper };