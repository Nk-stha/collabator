
export interface User {
    id: string;
    name: string;
    email: string;
    role: 'ADMIN' | 'VENDOR' | 'FRANCHISEE' | 'USER';
    status: 'ACTIVE' | 'INACTIVE';
    avatar?: string;
    permissions: string[];
}

export interface Station {
    id: string;
    station_name: string;
    serial_number: string;
    imei: string;
    latitude: string;
    longitude: string;
    address: string;
    status: 'ONLINE' | 'OFFLINE';
    total_slots: number;
    available_slots: number;
    occupied_slots: number;
    total_powerbanks: number;
    last_heartbeat: string;
}

export interface Transaction {
    id: string;
    transaction_id: string;
    type: 'EARNED' | 'CREDIT' | 'TOPUP' | 'DEBIT';
    amount?: number;
    points?: number;
    status: string;
    created_at: string;
    description: string;
    source: string;
    user: {
        id: string;
        username: string;
        email: string | null;
    };
}

export interface Rental {
    id: string;
    rental_code: string;
    status: string;
    payment_status: string;
    user_id: number;
    username: string;
    station_id: string;
    station_name: string;
    powerbank_serial: string;
    amount_paid: string;
    created_at: string;
}

const STATIONS: Station[] = [
    {
        "id": "bf51c810-5c25-4c35-8a3f-88d6fb86759c",
        "station_name": "Station 1609",
        "serial_number": "867016069821609",
        "imei": "867016069821609",
        "latitude": "0.000000",
        "longitude": "0.000000",
        "address": "Pending Configuration",
        "total_slots": 8,
        "status": "ONLINE",
        "last_heartbeat": "2025-12-15T16:25:45.817000+05:45",
        "available_slots": 8,
        "occupied_slots": 0,
        "total_powerbanks": 0
    },
    {
        "id": "33d0cd83-d7e6-4c12-acd4-4e84a06e977f",
        "station_name": "Station 0223",
        "serial_number": "868522071410223",
        "imei": "868522071410223",
        "latitude": "0.000000",
        "longitude": "0.000000",
        "address": "Pending Configuration",
        "total_slots": 8,
        "status": "ONLINE",
        "last_heartbeat": "2025-12-10T09:06:47.849000+05:45",
        "available_slots": 4,
        "occupied_slots": 4,
        "total_powerbanks": 7
    },
    {
        "id": "2f5b1153-6b58-4715-8f9c-9dd38ef947b4",
        "station_name": "Station 3607",
        "serial_number": "868522071413607",
        "imei": "868522071413607",
        "latitude": "0.000000",
        "longitude": "0.000000",
        "address": "Pending Configuration",
        "total_slots": 8,
        "status": "OFFLINE",
        "last_heartbeat": "2025-12-04T06:55:37.411127+05:45",
        "available_slots": 4,
        "occupied_slots": 4,
        "total_powerbanks": 3
    },
    {
        "id": "86d3ca93-ffcc-46cf-9d60-e8f86fa4ee9b",
        "station_name": "Station 0306",
        "serial_number": "868522071410306",
        "imei": "868522071410306",
        "latitude": "0.000000",
        "longitude": "0.000000",
        "address": "Pending Configuration",
        "total_slots": 8,
        "status": "OFFLINE",
        "last_heartbeat": "2025-12-04T06:53:31.254691+05:45",
        "available_slots": 4,
        "occupied_slots": 4,
        "total_powerbanks": 0
    },
    {
        "id": "1a235928-69f6-4241-a965-cb260901b564",
        "station_name": "Station 1529",
        "serial_number": "868522071401529",
        "imei": "868522071401529",
        "latitude": "0.000000",
        "longitude": "0.000000",
        "address": "Pending Configuration",
        "total_slots": 8,
        "status": "OFFLINE",
        "last_heartbeat": "2025-12-04T06:54:47.824182+05:45",
        "available_slots": 4,
        "occupied_slots": 4,
        "total_powerbanks": 0
    }
];

const TRANSACTIONS: Transaction[] = [
    {
        "source": "points",
        "id": "ae3645d7-0b82-4123-b009-230a7497811c",
        "transaction_id": "P-ae3645d7-0b82-4123-b009-230a7497811c",
        "user": {
            "id": "5",
            "username": "Sudeep",
            "email": null
        },
        "type": "EARNED",
        "points": 15,
        "status": "COMPLETED",
        "created_at": "2026-01-06T13:02:20.901766Z",
        "description": "Top-up reward for NPR 150.00"
    },
    {
        "source": "wallet",
        "id": "64939a2c-c25f-476a-82da-bae8fdcc4e4f",
        "transaction_id": "W-64939a2c-c25f-476a-82da-bae8fdcc4e4f",
        "user": {
            "id": "5",
            "username": "Sudeep",
            "email": null
        },
        "type": "CREDIT",
        "amount": 150,
        "status": "COMPLETED",
        "created_at": "2026-01-06T13:02:20.649512Z",
        "description": "Wallet top-up via esewa"
    },
    {
        "source": "payment",
        "id": "a72a9e4e-7a87-43a6-a988-c4113e8d62bc",
        "transaction_id": "TXN202601061302208RAH80",
        "user": {
            "id": "5",
            "username": "Sudeep",
            "email": null
        },
        "type": "TOPUP",
        "amount": 150,
        "status": "SUCCESS",
        "created_at": "2026-01-06T13:02:20.638113Z",
        "description": "Top Up - Success"
    },
    {
        "source": "points",
        "id": "70fbea61-aaea-45c6-9890-d295caad6e74",
        "transaction_id": "P-70fbea61-aaea-45c6-9890-d295caad6e74",
        "user": {
            "id": "14",
            "username": "alashgyawali0987",
            "email": "alashgyawali0987@gmail.com"
        },
        "type": "EARNED",
        "points": 50,
        "status": "COMPLETED",
        "created_at": "2025-12-26T07:18:18.579817Z",
        "description": "New user signup via google"
    },
    {
        "source": "wallet",
        "id": "124dcb45-8ed4-4f71-9039-e51739490626",
        "transaction_id": "W-124dcb45-8ed4-4f71-9039-e51739490626",
        "user": {
            "id": "13",
            "username": "Rohan shrestha",
            "email": null
        },
        "type": "DEBIT",
        "amount": 100,
        "status": "COMPLETED",
        "created_at": "2025-12-18T17:50:52.388916Z",
        "description": "Withdrawal request - WD50520YU6Q9"
    }
];

const RENTALS: Rental[] = [
    {
        "id": "365dc06d-d933-4b1e-b67f-02025e3f33a5",
        "rental_code": "D955L1EM",
        "status": "OVERDUE",
        "payment_status": "PAID",
        "user_id": 5,
        "username": "Sudeep",
        "station_id": "550e8400-e29b-41d4-a716-446655440001",
        "station_name": "Kathmandu Mall Station",
        "powerbank_serial": "PB001",
        "amount_paid": "50.00",
        "created_at": "2025-11-25T18:47:41.376158+05:45"
    },
    {
        "id": "3c5f1647-1470-4cb0-b5ae-3fef07c7e09a",
        "rental_code": "FHGD0GWC",
        "status": "COMPLETED",
        "payment_status": "PAID",
        "user_id": 1,
        "username": "janak",
        "station_id": "550e8400-e29b-41d4-a716-446655440301",
        "station_name": "Chitwan Mall Station",
        "powerbank_serial": "PB011",
        "amount_paid": "50.00",
        "created_at": "2025-11-12T11:58:29.673844+05:45"
    }
];

const USERS: User[] = [
    {
        id: 'usr_admin_001',
        name: 'Super Admin',
        email: 'admin@collabator.com',
        role: 'ADMIN',
        status: 'ACTIVE',
        permissions: ['all']
    },
    {
        id: 'usr_vendor_001',
        name: 'TechSolutions Vendor',
        email: 'contact@techsolutions.com',
        role: 'VENDOR',
        status: 'ACTIVE',
        permissions: ['manage_products', 'view_orders', 'manage_inventory']
    },
    {
        id: 'usr_franchise_001',
        name: 'Kathmandu Franchise',
        email: 'ktm@franchise.com',
        role: 'FRANCHISEE',
        status: 'ACTIVE',
        permissions: ['view_stations', 'manage_staff', 'view_reports']
    },
    {
        id: 'usr_user_001',
        name: 'Rohan Shrestha',
        email: 'rohan@example.com',
        role: 'USER',
        status: 'ACTIVE',
        permissions: ['rent_powerbank', 'view_history']
    }
];

export const MOCK_DATA = {
    stations: STATIONS,
    transactions: TRANSACTIONS,
    rentals: RENTALS,
    users: USERS
};
