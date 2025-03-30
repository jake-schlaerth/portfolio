// @generated automatically by Diesel CLI.

diesel::table! {
    sessions (id) {
        id -> Uuid,
        name -> Varchar,
        created_at -> Timestamp,
    }
}

diesel::table! {
    users (id) {
        id -> Int4,
        name -> Varchar,
        email -> Varchar,
    }
}

diesel::table! {
    whiteboard_events (id) {
        id -> Uuid,
        whiteboard_id -> Uuid,
        event_type -> Text,
        payload -> Jsonb,
        created_at -> Nullable<Timestamp>,
    }
}

diesel::table! {
    whiteboards (id) {
        id -> Uuid,
        name -> Varchar,
        password -> Nullable<Varchar>,
        created_at -> Nullable<Timestamp>,
    }
}

diesel::joinable!(whiteboard_events -> whiteboards (whiteboard_id));

diesel::allow_tables_to_appear_in_same_query!(
    sessions,
    users,
    whiteboard_events,
    whiteboards,
);
