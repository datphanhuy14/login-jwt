import dotenv from 'dotenv';
dotenv.config();

const { AMQP_HOSTNAME = '103.28.38.94', AMQP_PORT = 5672, AMQP_VHOST_CLIENT = 'local'} = process.env;
const { AMQP_USERNAME = 'mcbook', AMQP_PASSWORD = 'mcbook@123' } = process.env;
const defaultAMQP = {
    type: 'amqp',
    username: AMQP_USERNAME,
    password: AMQP_PASSWORD,
    hostname: AMQP_HOSTNAME,
    port: AMQP_PORT,
    vhost: AMQP_VHOST_CLIENT,
    publish: {
        persistent: true
    }
};

export default [
    {
        pin: { service: 'users' },
        ...defaultAMQP
    },
    {
        pin: { service: 'partitions' },
        ...defaultAMQP
    },
];
