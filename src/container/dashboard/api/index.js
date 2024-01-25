import { post, put } from "../../../helper/api";

const UsersService = {};

UsersService.fetchUsers = async ({ from = 0, size = 10, domains }) => {
    const urlObj = {
        url: 'https://gotest-xj8jikrn.b4a.run/users',
        query: {
            from,
            size,
            authorizer: "some_admin_id",
            source: 'email_generator_frontend'
        },
        headers: {
            'Access-Control-Request-Method' : 'GET'
        }
    };
    const response = await post({ urlObj, req: { body: { domains }} });
    console.log(response);
    return response;
};

UsersService.addUser = async ({ first_name, last_name, domain }) => {
    const urlObj = {
        url: 'https://gotest-xj8jikrn.b4a.run/generate_email',
        query: {
            authorizer: "some_admin_id",
            source: 'email_generator_frontend'
        },
        headers: {
            'Access-Control-Request-Method' : 'PUT'
        }
    };

    const body = {
        full_name: {
            first_name: first_name.trim(),
            last_name: last_name.trim()
        },
        domain: {
            name: domain
        },
        request_meta: {
            authorizer: "some_admin_id",
            source: 'email_generator_frontend'
        }
    }
    const response = await put({ urlObj, req: { body } });
    console.log(response);
    return response;
};


export default UsersService;
