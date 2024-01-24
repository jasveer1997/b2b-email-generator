const columns = [
    {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        render: (text) => <b>{text}</b>,
    },
    {
        title: 'Domain',
        dataIndex: 'domain',
        key: 'domain',
        render: (text) => <b>{text}</b>,
    },
    {
        title: 'Generated Email',
        dataIndex: 'email',
        key: 'email',
    },
];

export { columns };