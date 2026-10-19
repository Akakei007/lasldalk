
const sequelize = require('./database');
const { Author, Book } = require('./models');

async function main() {
  try {
    await sequelize.authenticate();
    console.log('Подключение к базе данных успешно.');

    await sequelize.sync({ force: true });

    const author = await Author.create({
      name: 'Александр Пушкин',
      country: 'Россия',
    });

    await author.createBook({
      title: 'Евгений Онегин',
      year: 1833,
      genre: 'Роман в стихах',
    });

    await author.createBook({
      title: 'Капитанская дочка',
      year: 1836,
      genre: 'Исторический роман',
    });

    const books = await author.getBooks();
    console.log('Количество книг:', books.length);

    const authors = await Author.findAll({
      include: [{
        model: Book,
        as: 'books',
      }],
    });

    console.log('\nАвторы и их книги:');
    console.log(JSON.stringify(authors, null, 2));
  } catch (error) {
    console.error('Ошибка:', error);
  } finally {
    await sequelize.close();
  }
}

main();
