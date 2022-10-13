import { createServer, Factory, Model, Response, ActiveModelSerializer } from 'miragejs'

type User = {
	name: string;
	email: string;
	created_at: string;
}

export const makeServer = () => {
	const server = createServer({
		serializers: {
			application: ActiveModelSerializer,
		},
		models: {
			user: Model.extend<Partial<User>>({} as User),
		},
		seeds(server) {
			server.createList('user', 200);
		},

		routes() {
			this.namespace = 'api';
			this.timing = 750;
			this.get('/users', function (schema, request) {
				const { page = 1, per_page = 10 } = request.queryParams;

				const total = schema.all('user').length;

				const start = (Number(page) - 1) * Number(per_page);
				const end = start + Number(per_page);

				const users = this.serialize(schema.all('user')).users.slice(start, end);

				return new Response(200,
					{ 'x-total-count': String(total) },
					{ users }
				)
			});
			this.get('/users/:id');
			this.post('/users');

			this.namespace = '';
			this.passthrough(); 
		}
	})

	return server;
}