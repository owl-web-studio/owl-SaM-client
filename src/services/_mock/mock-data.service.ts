import {Injectable} from '@angular/core';
import {MockUserData} from "../../entities/_mock/mock-user-data.model";
import {Space} from "../../entities/space.model";
import {Role} from "../../entities/role.model";
import {of} from "rxjs";
import {Organization} from "../../entities/organization.model";
import {Directory} from "../../entities/directory.model";
import {Format} from "../../entities/format.model";
import {Knowledge} from "../../entities/knowledge.model";
import {Category} from "../../entities/category.model";
import {KnowledgeComment} from "../../entities/knowledge-comment.model";
import {User} from "../../entities/user.model";
import {UserGroup} from "../../entities/user-group.model";

type DataType =
  'organizations'     |
  'spaces'            |
  'users'             |
  'userGroups'        |
  'knowledgeTree'     |
  'formats'           |
  'roles'             |
  'categories'        |
  'rating'            |
  'knowledgeComments'
  ;

@Injectable({
  providedIn: 'root'
})
export class MockDataService {
  roles: Role[] = [
    {
      id: 1,
      name: 'Пользователь',
      description: 'Роль с базовыми правами'
    },
    {
      id: 999,
      name: 'Администратор',
      description: 'Роль с неограниченными правами',
      isAdmin: true
    }
  ];
  users: MockUserData[] = [
    {
      id: 1,
      login: 'test',
      password: 'test',
      firstName: 'Иван',
      lastName: 'Иванов',
      patronymic: 'Иванович',
      email: 'test@mail.ru',
      phoneNumber: '+79876543210',
      jobTitle: 'Тестовая должность',
      roles: [this.roles[0]],
    },
    {
      id: 2,
      login: 'admin',
      password: 'admin',
      firstName: 'Степан',
      lastName: 'Беркунов',
      patronymic: 'Игоревич',
      email: 'studiorain27@gmail.com',
      phoneNumber: '+799900000000',
      jobTitle: 'Генеральный директор',
      roles: [this.roles[0], this.roles[1]],
      // avatarUrl: 'https://i.ibb.co/nPbJ4Cx/hqdefault.jpg',
    },
    {
      id: 3,
      login: 'nikulin.v',
      password: 'test',
      firstName: 'Василий',
      lastName: 'Никулин',
      patronymic: 'Петрович',
      email: 'nikulin.v@mail.ru',
      phoneNumber: '+79872142523',
      jobTitle: 'Инженер-разработчик',
      roles: [this.roles[0]],
    },
    {
      id: 4,
      login: 'vershinin.a',
      password: 'test',
      firstName: 'Алексей',
      lastName: 'Вершинин',
      patronymic: 'Геннадьевич',
      email: 'vershinin.a@mail.ru',
      phoneNumber: '+79992410018',
      jobTitle: 'Аналитик',
      roles: [this.roles[0]],
    },
    {
      id: 5,
      login: 'hametov.k',
      password: 'test',
      firstName: 'Константин',
      lastName: 'Хаметов',
      patronymic: 'Иванович',
      email: 'hametov.k@mail.ru',
      phoneNumber: '+79259100012',
      jobTitle: 'Инженер QA',
      roles: [this.roles[0]],
    },
    {
      id: 6,
      login: 'lipovetskiy.k',
      password: 'test',
      firstName: 'Кирилл',
      lastName: 'Липовецкий',
      patronymic: 'Валерьевич',
      email: 'lipovetskiy.k@mail.ru',
      phoneNumber: '+79259100012',
      jobTitle: 'Ведущий инженер-разработчик',
      roles: [this.roles[0]],
    },
    {
      id: 7,
      login: 'ivanov.n',
      password: 'test',
      firstName: 'Николай',
      lastName: 'Иванов',
      patronymic: 'Константинович',
      email: 'ivanov.n@mail.ru',
      phoneNumber: '+79259100012',
      jobTitle: 'Инжненер-разработчик',
      roles: [this.roles[0]],
    },
  ];
  userGroups: UserGroup[] = [
    {
      id: 1,
      name: 'Аналитики',
      description: 'Группа для аналитиктов',
      users: [
        this.users[1],
        this.users[3],
      ]
    },
    {
      id: 2,
      name: 'Разработчики',
      description: 'Группа для разработчиков',
      users: [
        this.users[1],
        this.users[2],
        this.users[5],
        this.users[6],
      ]
    },
    {
      id: 2,
      name: 'Тестировщики',
      description: 'Группа для тестировщиков',
      users: [
        this.users[4]
      ]
    }
  ];
  spaces: Space[] = [
    {
      id: 1,
      name: 'Департамент R&D',
      description: 'Знания департамента развития и проектирования',

    },
    {
      id: 2,
      name: 'Департамент разработки',
      description: 'Знания департамента разработки',
    }
  ];
  organizations: Organization[] = [
    {
      id: 1,
      name: 'Типовая ИТ-компания',
      description: '\n' +
        'Типовая ИТ-компания — , специализирующаяся на разработке программного обеспечения с использованием трёхмерных моделей. Основное направление деятельности компании включает создание 3D-приложений для различных отраслей, таких как архитектура, медицина и развлечения. Команда высококвалифицированных разработчиков и дизайнеров обеспечивает инновационные решения, сочетающие передовые технологии и креативный подход.',
      leader: this.users[1]
    },
    {
      id: 2,
      name: 'ООО "Хельги Лаб',
      description: '\n' +
        '"Блины и галошницы" - это не просто организация, это наша страсть, наше призвание создавать уют и радость для каждого нашего гостя. Мы верим в силу традиций и качества, поэтому каждый блин, который мы приготовляем, и каждая пара галош, которую мы предлагаем, являются результатом тщательно сохраняемых рецептов и высокого мастерства. Наша команда с любовью и вниманием уделяет каждой детали, чтобы создать атмосферу уюта и удовольствия для наших посетителей. Добро пожаловать в мир "Блинов и галошниц" - место, где вкус встречается с комфортом!',
      leader: this.users[1]
    },
    {
      id: 3,
      name: 'ООО "СОВЫ ВЕБ"',
      description: '\n' +
        '"Блины и галошницы" - это не просто организация, это наша страсть, наше призвание создавать уют и радость для каждого нашего гостя. Мы верим в силу традиций и качества, поэтому каждый блин, который мы приготовляем, и каждая пара галош, которую мы предлагаем, являются результатом тщательно сохраняемых рецептов и высокого мастерства. Наша команда с любовью и вниманием уделяет каждой детали, чтобы создать атмосферу уюта и удовольствия для наших посетителей. Добро пожаловать в мир "Блинов и галошниц" - место, где вкус встречается с комфортом!',
      leader: this.users[1]
    },
  ];
  formats: Format[] = [
    {
      id: 1,
      name: 'Текст',
      extensions: ['.md'],
      type: 'markdown'
    },
    {
      id: 2,
      name: 'Документ PDF',
      extensions: ['.pdf'],
      type: 'pdf'
    },
    {
      id: 3,
      name: 'Документ word',
      extensions: ['.docx'],
      type: 'file'
    },
    {
      id: 4,
      name: 'Изображение',
      extensions: ['.png', '.jpeg', '.jpg'],
      type: 'image'
    },
    {
      id: 5,
      name: 'Трёхмерная модель ',
      extensions: ['.glb', '.gltf'],
      type: '3d'
    },
    {
      id: 6,
      name: 'Программный код',
      extensions: ['.js', '.ts', '.html', '.css', '.scss', '.java', '.cpp', '.h', '.py'],
      type: 'code'
    }
  ];
  categories: Category[] = [
    {
      id: 1,
      name: 'Общее',
      description: ''
    },
    {
      id: 2,
      name: 'BPMN',
      description: ''
    },
    {
      id: 3,
      name: 'Модели автомобилей',
      description: ''
    },
  ];
  knowledgeTree: Directory = {
    id: 1,
    name: 'Корневая директория',
    description: '',
    availableFormats: this.formats,
    createTime: new Date(),
    updateTime: new Date(),
    children: [
      {
        id: 3,
        name: 'Основные бизнес-процессы',
        description: '',
        createTime: new Date(),
        updateTime: new Date(),
        children: [
          {
            id: 4,
            name: 'Управление знаниями',
            description: 'Основная информация о компании',
            content: 'https://i.ibb.co/BCSRKXY/image.png',
            format: this.formats[0],
            createTime: new Date(),
            updateTime: new Date(),
            categories: [
              this.categories[0]
            ]
          }
        ],
        categories: [
          this.categories[1]
        ],
      },
      {
        id: 6,
        name: 'Полезные материалы',
        description: '',
        createTime: new Date(),
        updateTime: new Date(),
        children: [
          {
            id: 7,
            name: 'Акт выполнения процесса №21',
            description: 'Основная информация о компании',
            content: 'лялялялял',
            format: this.formats[0],
            createTime: new Date(),
            updateTime: new Date(),
            categories: [
              this.categories[0]
            ]
          }
        ],
        categories: [
          this.categories[1]
        ],
      },
      {
        id: 2,
        name: 'Главные бизнес-процессы',
        description: 'Основная информация о компании',
        content: 'Бизнес-процессы являются основой любого предприятия, обеспечивая последовательность и координацию действий для достижения стратегических целей. Главные бизнес-процессы включают **управление цепочками поставок**, **производственные операции**, **управление клиентскими отношениями** и **финансовый менеджмент**. **Управление цепочками поставок** охватывает весь путь продукта от поставщиков до конечного потребителя, обеспечивая своевременное и эффективное перемещение товаров и услуг. **Производственные операции** включают в себя планирование, управление и контроль за производственным процессом, обеспечивая выпуск продукции в соответствии с заданными стандартами качества.\n' +
          '\n' +
          '**Управление клиентскими отношениями** направлено на создание и поддержание долгосрочных взаимоотношений с клиентами, удовлетворение их потребностей и повышение лояльности. **Финансовый менеджмент** охватывает все аспекты управления финансами компании, включая **планирование бюджета**, **учет и контроль затрат**, **управление доходами и инвестициями**. Каждый из этих процессов требует внимательного подхода и использования современных технологий и инструментов для повышения эффективности и конкурентоспособности предприятия. В совокупности, эти бизнес-процессы позволяют компании достигать поставленных целей и обеспечивать устойчивое развитие в долгосрочной перспективе.',
        format: this.formats[0],
        createTime: new Date(),
        updateTime: new Date(),
        categories: [
          this.categories[0]
        ]
      },
      {
        id: 5,
        name: 'Информация о компании',
        description: 'Основная информация о компании',
        content: 'Компания была основана в 2023 году',
        format: this.formats[0],
        createTime: new Date(),
        updateTime: new Date(),
        categories: [
          this.categories[0]
        ]
      }
    ]
  };
  knowledgeRating = [
    {
      knowledgeId: 2,
      userRating: [
        {
          userId: 1,
          rating: 5
        },
        {
          userId: 2,
          rating: 4
        },
        {
          userId: 3,
          rating: 3
        },
        {
          userId: 4,
          rating: 4
        },
        {
          userId: 5,
          rating: 1
        },
        {
          userId: 6,
          rating: 4
        },
        {
          userId: 7,
          rating: 5
        }
      ]
    },
    {
      knowledgeId: 4,
      userRating: [
        {
          userId: 1,
          rating: 2
        },
        {
          userId: 2,
          rating: 3
        },
        {
          userId: 3,
          rating: 3
        },
        {
          userId: 4,
          rating: 3
        },
        {
          userId: 5,
          rating: 2
        },
        {
          userId: 6,
          rating: 4
        },
        {
          userId: 7,
          rating: 1
        }
      ]
    },
    {
      knowledgeId: 5,
      userRating: [
        {
          userId: 1,
          rating: 3
        },
        {
          userId: 2,
          rating: 3
        },
        {
          userId: 3,
          rating: 2
        },
        {
          userId: 4,
          rating: 5
        },
        {
          userId: 5,
          rating: 5
        },
        {
          userId: 6,
          rating: 4
        },
        {
          userId: 7,
          rating: 3
        }
      ]
    },
    {
      knowledgeId: 7,
      userRating: [
        {
          userId: 1,
          rating: 5
        },
        {
          userId: 2,
          rating: 4
        },
        {
          userId: 3,
          rating: 3
        },
        {
          userId: 4,
          rating: 4
        },
        {
          userId: 5,
          rating: 1
        },
        {
          userId: 6,
          rating: 4
        },
        {
          userId: 7,
          rating: 5
        }
      ]
    }
  ];
  knowledgeComments: {
    knowledgeId: number,
    comments: KnowledgeComment[]
  }[] = [
    {
      knowledgeId: 2,
      comments: [
        {
          id: 1,
          content: 'Полезный документ!',
          author: this.users[2],
          createDate: new Date(),
          updateDate: new Date(),
        },
        {
          id: 2,
          content: 'Не совсем понятен пункт 1',
          author: this.users[3],
          createDate: new Date(),
          updateDate: new Date(),
        },
        {
          id: 3,
          content: 'Что такое "Интеграция с шиной?"',
          author: this.users[4],
          createDate: new Date(),
          updateDate: new Date(),
        }
      ]
    },
    {
      knowledgeId: 3,
      comments: []
    },
    {
      knowledgeId: 5,
      comments: []
    },
    {
      knowledgeId: 7,
      comments: []
    }
  ];

  constructor() {
  }

  get(dataType: DataType) {
    let result: any = [];

    switch (dataType) {
      case 'organizations':
        result = this.organizations;
        break;
      case 'spaces':
        result = this.spaces;
        break;
      case 'users':
        result = this.users.map(user => {
          delete (user as any).password;
          return user
        });
        break;
      case "userGroups":
        result = this.userGroups;
        break;
      case 'knowledgeTree':
        result = this.knowledgeTree;
        break;
      case 'formats':
        result = this.formats;
        break;
      case 'roles':
        result = this.roles;
        break;
      case 'categories':
        result = this.categories;
        break;
      case "rating":
        result = this.knowledgeRating;
        break;
      case "knowledgeComments":
        result = this.knowledgeComments;
        break;
    }

    return of(result);
  }

  getById(dataType: DataType, id: number) {
    let result: any = {};

    switch (dataType) {
      case "organizations":
        result = this.organizations.find((organization) => {
          return organization.id === id;
        });
        break;
      case "spaces":
        result = this.spaces.find((space) => {
          return space.id === id;
        });
        break;
      case "users":
        result = this.users.find((user) => {
          return user.id === id;
        });
        delete (result as any).password
        break;
      case "userGroups":
        result = this.userGroups.find((userGroup) => {
          return userGroup.id === id;
        });
        break;
      case "formats":
        result = this.formats.find((format) => {
          return format.id === id;
        });
        break;
      case "roles":
        result = this.roles.find((role) => {
          return role.id === id;
        });
        break;
      case "categories":
        result = this.categories.find((category) => {
          return category.id === id;
        });
        break;
      case "rating":
        result = this.knowledgeRating.find((userRating) => {
          return userRating.knowledgeId === id;
        });
        break;
      case "knowledgeComments":
        result = this.knowledgeComments.find((knowledgeComments) => {
          return knowledgeComments.knowledgeId === id;
        });
        break;
    }

    return of(result);
  }

  post(dataType: DataType, data: any) {
    let result: any = [];

    switch (dataType) {
      case "organizations":
        this.organizations.push({
          id: this.organizations[this.organizations.length - 1].id + 1,
          ...data
        });
        result = this.organizations.find(element => element.id === this.organizations[this.organizations.length - 1].id + 1);
        break;
      case "spaces":
        this.spaces.push({
          id: this.spaces[this.spaces.length - 1].id + 1,
          ...data
        });
        result = this.spaces.find(element => element.id === this.spaces[this.spaces.length - 1].id + 1);
        break;
      case "users":
        this.users.push({
          id: this.users[this.users.length - 1].id + 1,
          ...data
        });
        result = this.users.find(element => element.id === this.users[this.users.length - 1].id + 1);
        break;
      case "formats":
        this.formats.push({
          id: this.formats[this.formats.length - 1].id + 1,
          ...data
        });
        result = this.formats.find(element => element.id === this.formats[this.formats.length - 1].id + 1);
        break;
      case "roles":
        this.roles.push({
          id: this.roles[this.roles.length - 1].id + 1,
          ...data
        });
        result = this.roles.find(element => element.id === this.roles[this.roles.length - 1].id + 1);
        break;
      case "categories":
        this.categories.push({
          id: this.categories[this.categories.length - 1].id + 1,
          ...data
        });
        result = this.categories.find(element => element.id === this.categories[this.categories.length - 1].id + 1);
        break;
      case "rating":
        const userRatings = this.knowledgeRating.find(userRating => {
          return data.knowledgeId === userRating.knowledgeId;
        });

        if (userRatings) {
          userRatings.userRating = data.userRating;
        } else {
          this.knowledgeRating.push(data);
        }

        result = this.knowledgeRating.find(element => element.knowledgeId === data.knowledgeId);
        break;
      case "knowledgeComments":
        const knowledgesComments = this.knowledgeComments.find(knowledgeComments => {
          return data.knowledgeId === knowledgeComments.knowledgeId;
        });

        if (knowledgesComments) {
          knowledgesComments.comments = data.comments;
        } else {
          this.knowledgeComments.push(data);
        }

        result = this.knowledgeComments.find(element => element.knowledgeId === data.knowledgeId);
        break;
    }

    return of(result);
  }
}
