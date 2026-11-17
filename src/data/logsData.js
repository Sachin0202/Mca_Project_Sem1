// Server Logs Dataset for Smart Web Server Log Management System

export const sampleLogs = [
  {
    id: 'LOG-1001',
    timestamp: '2026-11-11 22:42:15',
    ip: '192.168.1.105',
    method: 'GET',
    url: '/api/v1/dashboard/stats',
    statusCode: 200,
    responseTime: 45,
    severity: 'INFO',
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36',
    referer: 'https://admin.logmonitor.internal/dashboard',
    country: 'United States',
    bytesSent: 4210,
    protocol: 'HTTP/2.0',
    details: {
      headers: {
        'Host': 'api.logmonitor.internal',
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
        'Accept': 'application/json'
      },
      queryParams: { period: '24h', metrics: 'all' },
      body: null,
      responseSummary: 'Returned aggregate metrics for current cluster nodes (Node-01, Node-02).'
    }
  },
  {
    id: 'LOG-1002',
    timestamp: '2026-11-11 22:41:58',
    ip: '45.33.32.156',
    method: 'POST',
    url: '/api/v1/auth/login',
    statusCode: 401,
    responseTime: 180,
    severity: 'WARN',
    userAgent: 'Python-requests/2.31.0',
    referer: 'Direct / None',
    country: 'Germany',
    bytesSent: 340,
    protocol: 'HTTP/1.1',
    details: {
      headers: {
        'Host': 'api.logmonitor.internal',
        'Content-Type': 'application/json',
        'User-Agent': 'Python-requests/2.31.0'
      },
      queryParams: {},
      body: '{"username":"admin_super","passphrase":"***"}',
      responseSummary: 'Authentication failed: Invalid credentials provided. Repeated failure count: 3.'
    }
  },
  {
    id: 'LOG-1003',
    timestamp: '2026-11-11 22:41:40',
    ip: '10.0.4.12',
    method: 'POST',
    url: '/api/v1/orders/checkout',
    statusCode: 500,
    responseTime: 1420,
    severity: 'ERROR',
    userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.4 Safari/605.1.15',
    referer: 'https://store.company.com/checkout',
    country: 'India',
    bytesSent: 1250,
    protocol: 'HTTP/2.0',
    details: {
      headers: {
        'Host': 'store.company.com',
        'Content-Type': 'application/json'
      },
      queryParams: {},
      body: '{"cartId":"CART-89410","paymentGateway":"STRIPE_V3","amount":499.00}',
      responseSummary: 'java.lang.NullPointerException: PaymentGatewayResponse is null at com.logmonitor.service.PaymentService.processTransaction(PaymentService.java:184)',
      stackTrace: `java.lang.NullPointerException: Cannot invoke "com.stripe.model.PaymentIntent.getStatus()" because "intent" is null
    at com.logmonitor.billing.service.StripeGateway.confirmPayment(StripeGateway.java:142)
    at com.logmonitor.checkout.OrderProcessor.finalizeOrder(OrderProcessor.java:88)
    at java.base/jdk.internal.reflect.NativeMethodAccessorImpl.invoke0(Native Method)
    at org.springframework.web.method.support.InvocableHandlerMethod.doInvoke(InvocableHandlerMethod.java:205)`
    }
  },
  {
    id: 'LOG-1004',
    timestamp: '2026-11-11 22:40:22',
    ip: '172.56.21.89',
    method: 'GET',
    url: '/wp-login.php',
    statusCode: 404,
    responseTime: 32,
    severity: 'WARN',
    userAgent: 'Mozilla/5.0 (compatible; Nmap Scripting Engine; https://nmap.org/book/nse.html)',
    referer: 'Direct / None',
    country: 'Russia',
    bytesSent: 280,
    protocol: 'HTTP/1.1',
    details: {
      headers: {
        'Host': 'production-server.com',
        'Connection': 'close'
      },
      queryParams: {},
      body: null,
      responseSummary: 'Endpoint not mapped on Spring Boot DispatcherServlet. Suspicious vulnerability scan attempt.'
    }
  },
  {
    id: 'LOG-1005',
    timestamp: '2026-11-11 22:39:15',
    ip: '192.168.1.112',
    method: 'GET',
    url: '/api/v1/products?category=hardware&page=1&limit=20',
    statusCode: 200,
    responseTime: 68,
    severity: 'INFO',
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/130.0.0.0 Safari/537.36',
    referer: 'https://store.company.com/catalog',
    country: 'United States',
    bytesSent: 18450,
    protocol: 'HTTP/2.0',
    details: {
      headers: {
        'Host': 'store.company.com',
        'Accept': 'application/json'
      },
      queryParams: { category: 'hardware', page: '1', limit: '20' },
      body: null,
      responseSummary: 'Fetched 20 catalog records from Redis Cache (Cache HIT).'
    }
  },
  {
    id: 'LOG-1006',
    timestamp: '2026-11-11 22:38:44',
    ip: '203.0.113.195',
    method: 'PUT',
    url: '/api/v1/users/profile/settings',
    statusCode: 200,
    responseTime: 112,
    severity: 'INFO',
    userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_5 like Mac OS X) AppleWebKit/605.1.15',
    referer: 'https://admin.logmonitor.internal/settings',
    country: 'United Kingdom',
    bytesSent: 1540,
    protocol: 'HTTP/2.0',
    details: {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ***'
      },
      queryParams: {},
      body: '{"notificationsEnabled":true,"theme":"light","alertThreshold":5}',
      responseSummary: 'User preferences successfully persisted in database table `user_settings`.'
    }
  },
  {
    id: 'LOG-1007',
    timestamp: '2026-11-11 22:37:02',
    ip: '198.51.100.44',
    method: 'DELETE',
    url: '/api/v1/reports/archive/REP-2025-Q3',
    statusCode: 204,
    responseTime: 95,
    severity: 'INFO',
    userAgent: 'PostmanRuntime/7.39.0',
    referer: 'Direct / Postman',
    country: 'Canada',
    bytesSent: 0,
    protocol: 'HTTP/1.1',
    details: {
      headers: {
        'Authorization': 'Bearer admin-token-secret'
      },
      queryParams: {},
      body: null,
      responseSummary: 'Report file removed from S3 bucket storage `log-analytics-backups`.'
    }
  },
  {
    id: 'LOG-1008',
    timestamp: '2026-11-11 22:36:19',
    ip: '185.220.101.5',
    method: 'GET',
    url: '/admin/database/export.sql',
    statusCode: 403,
    responseTime: 22,
    severity: 'WARN',
    userAgent: 'curl/7.88.1',
    referer: 'Direct / CLI',
    country: 'Netherlands',
    bytesSent: 430,
    protocol: 'HTTP/1.1',
    details: {
      headers: {
        'User-Agent': 'curl/7.88.1'
      },
      queryParams: {},
      body: null,
      responseSummary: 'Spring Security access denied: Role ROLE_SUPERADMIN required. Client IP flagged by Web Application Firewall.'
    }
  },
  {
    id: 'LOG-1009',
    timestamp: '2026-11-11 22:35:10',
    ip: '10.0.8.91',
    method: 'GET',
    url: '/api/v1/analytics/realtime-stream',
    statusCode: 503,
    responseTime: 3100,
    severity: 'CRITICAL',
    userAgent: 'LogMonitor-Agent/2.4.0',
    referer: 'https://admin.logmonitor.internal',
    country: 'Internal VPC',
    bytesSent: 520,
    protocol: 'HTTP/2.0',
    details: {
      headers: {
        'Host': 'internal.cluster.local'
      },
      queryParams: {},
      body: null,
      responseSummary: 'Connection pool exhausted: Active connections reached limit 500. HikariCP pool timeout after 30000ms.',
      stackTrace: `com.zaxxer.hikari.pool.HikariPool$PoolInitializationException: Failed to initialize pool: Connection timeout
    at com.zaxxer.hikari.util.ConcurrentBag.borrow(ConcurrentBag.java:148)
    at com.zaxxer.hikari.pool.HikariPool.getConnection(HikariPool.java:166)
    at org.springframework.jdbc.datasource.DataSourceUtils.getConnection(DataSourceUtils.java:79)`
    }
  },
  {
    id: 'LOG-1010',
    timestamp: '2026-11-11 22:33:55',
    ip: '192.168.1.105',
    method: 'GET',
    url: '/static/css/dashboard.chunk.css',
    statusCode: 304,
    responseTime: 12,
    severity: 'INFO',
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/130.0.0.0 Safari/537.36',
    referer: 'https://admin.logmonitor.internal/dashboard',
    country: 'United States',
    bytesSent: 0,
    protocol: 'HTTP/2.0',
    details: {
      headers: {
        'If-None-Match': 'W/"7821-1718293"',
        'If-Modified-Since': 'Mon, 10 Nov 2026 12:00:00 GMT'
      },
      queryParams: {},
      body: null,
      responseSummary: 'Resource unchanged on server. HTTP 304 returned with empty payload.'
    }
  },
  {
    id: 'LOG-1011',
    timestamp: '2026-11-11 22:31:04',
    ip: '104.28.19.42',
    method: 'POST',
    url: '/api/v1/logs/upload',
    statusCode: 201,
    responseTime: 620,
    severity: 'INFO',
    userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)',
    referer: 'https://admin.logmonitor.internal/upload',
    country: 'United States',
    bytesSent: 1820,
    protocol: 'HTTP/2.0',
    details: {
      headers: {
        'Content-Type': 'multipart/form-data; boundary=----WebKitFormBoundary...'
      },
      queryParams: {},
      body: '[File: access_log_2026_11_10.log (3.4 MB)]',
      responseSummary: 'Log batch ingested: 18,490 log lines parsed into database in 540ms.'
    }
  },
  {
    id: 'LOG-1012',
    timestamp: '2026-11-11 22:29:40',
    ip: '192.0.2.88',
    method: 'GET',
    url: '/api/v1/inventory/items/ITEM-998812',
    statusCode: 404,
    responseTime: 38,
    severity: 'WARN',
    userAgent: 'Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:128.0) Gecko/20100101 Firefox/128.0',
    referer: 'https://store.company.com/search?q=item-998812',
    country: 'France',
    bytesSent: 395,
    protocol: 'HTTP/2.0',
    details: {
      headers: {
        'Accept': 'application/json'
      },
      queryParams: {},
      body: null,
      responseSummary: 'Requested resource item `ITEM-998812` was not found in active inventory catalog.'
    }
  },
  {
    id: 'LOG-1013',
    timestamp: '2026-11-11 22:28:12',
    ip: '198.51.100.12',
    method: 'POST',
    url: '/api/v1/users',
    statusCode: 400,
    responseTime: 55,
    severity: 'WARN',
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
    referer: 'https://admin.logmonitor.internal/users',
    country: 'Japan',
    bytesSent: 610,
    protocol: 'HTTP/2.0',
    details: {
      headers: {
        'Content-Type': 'application/json'
      },
      queryParams: {},
      body: '{"name":"John Doe","email":"not-an-email","role":"Auditor"}',
      responseSummary: 'ConstraintViolationException: Validation error in field "email": Must be a well-formed email address.'
    }
  },
  {
    id: 'LOG-1014',
    timestamp: '2026-11-11 22:26:05',
    ip: '10.0.1.5',
    method: 'GET',
    url: '/actuator/health',
    statusCode: 200,
    responseTime: 18,
    severity: 'INFO',
    userAgent: 'Consul-HealthCheck/1.15.0',
    referer: 'Internal Health Probe',
    country: 'Internal VPC',
    bytesSent: 290,
    protocol: 'HTTP/1.1',
    details: {
      headers: {
        'User-Agent': 'Consul-HealthCheck/1.15.0'
      },
      queryParams: {},
      body: null,
      responseSummary: 'Health status UP. DiskSpace: UP, Database: UP, RabbitMQ: UP.'
    }
  },
  {
    id: 'LOG-1015',
    timestamp: '2026-11-11 22:24:51',
    ip: '172.16.4.88',
    method: 'GET',
    url: '/api/v1/reports/weekly/download',
    statusCode: 200,
    responseTime: 480,
    severity: 'INFO',
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
    referer: 'https://admin.logmonitor.internal/reports',
    country: 'India',
    bytesSent: 48500,
    protocol: 'HTTP/2.0',
    details: {
      headers: {
        'Content-Type': 'text/csv',
        'Content-Disposition': 'attachment; filename="weekly_logs_2026_w45.csv"'
      },
      queryParams: { format: 'csv', range: '7d' },
      body: null,
      responseSummary: 'Export stream completed: Generated 2,400 rows of aggregated log reports.'
    }
  },
  {
    id: 'LOG-1016',
    timestamp: '2026-11-11 22:22:18',
    ip: '162.243.150.9',
    method: 'POST',
    url: '/api/v1/alerts/rule/evaluate',
    statusCode: 502,
    responseTime: 5020,
    severity: 'ERROR',
    userAgent: 'AlertEngine/1.0',
    referer: 'Internal Scheduler',
    country: 'United States',
    bytesSent: 412,
    protocol: 'HTTP/1.1',
    details: {
      headers: {
        'X-Service-Name': 'AlertEvaluator'
      },
      queryParams: {},
      body: '{"ruleId":"ALERT-SPK-01"}',
      responseSummary: 'Bad Gateway: Upstream inference engine timed out after 5000ms during ML log anomaly calculation.'
    }
  },
  {
    id: 'LOG-1017',
    timestamp: '2026-11-11 22:20:02',
    ip: '192.168.1.105',
    method: 'GET',
    url: '/api/v1/alerts?status=ACTIVE',
    statusCode: 200,
    responseTime: 36,
    severity: 'INFO',
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
    referer: 'https://admin.logmonitor.internal/alerts',
    country: 'United States',
    bytesSent: 3420,
    protocol: 'HTTP/2.0',
    details: {
      headers: {
        'Authorization': 'Bearer ***'
      },
      queryParams: { status: 'ACTIVE' },
      body: null,
      responseSummary: 'Fetched 6 active system alerts with priority sorting.'
    }
  },
  {
    id: 'LOG-1018',
    timestamp: '2026-11-11 22:18:30',
    ip: '82.165.197.1',
    method: 'GET',
    url: '/.env',
    statusCode: 404,
    responseTime: 25,
    severity: 'WARN',
    userAgent: 'curl/7.68.0',
    referer: 'Direct / Scanner',
    country: 'Germany',
    bytesSent: 260,
    protocol: 'HTTP/1.1',
    details: {
      headers: {
        'User-Agent': 'curl/7.68.0'
      },
      queryParams: {},
      body: null,
      responseSummary: 'Attempted to probe environment secrets file. Request blocked by routing filter.'
    }
  },
  {
    id: 'LOG-1019',
    timestamp: '2026-11-11 22:15:12',
    ip: '192.168.1.200',
    method: 'PUT',
    url: '/api/v1/alerts/ALT-501/resolve',
    statusCode: 200,
    responseTime: 85,
    severity: 'INFO',
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
    referer: 'https://admin.logmonitor.internal/alerts',
    country: 'United States',
    bytesSent: 820,
    protocol: 'HTTP/2.0',
    details: {
      headers: {
        'Authorization': 'Bearer ***'
      },
      queryParams: {},
      body: '{"resolutionNote":"Database pool resized from 100 to 250 connections."}',
      responseSummary: 'Alert marked as RESOLVED by administrator.'
    }
  },
  {
    id: 'LOG-1020',
    timestamp: '2026-11-11 22:12:44',
    ip: '195.154.122.18',
    method: 'POST',
    url: '/api/v1/billing/webhook/stripe',
    statusCode: 200,
    responseTime: 165,
    severity: 'INFO',
    userAgent: 'Stripe/1.0 (+https://stripe.com/docs/webhooks)',
    referer: 'https://hooks.stripe.com',
    country: 'Ireland',
    bytesSent: 420,
    protocol: 'HTTP/2.0',
    details: {
      headers: {
        'Stripe-Signature': 't=1672531182,v1=9e8...7a'
      },
      queryParams: {},
      body: '{"type":"payment_intent.succeeded","id":"evt_3Msw2026"}',
      responseSummary: 'Webhook signature verified. Subscription upgraded.'
    }
  },
  {
    id: 'LOG-1021',
    timestamp: '2026-11-11 22:10:19',
    ip: '14.139.128.5',
    method: 'GET',
    url: '/api/v1/logs/stats/hourly',
    statusCode: 200,
    responseTime: 92,
    severity: 'INFO',
    userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)',
    referer: 'https://admin.logmonitor.internal/dashboard',
    country: 'India',
    bytesSent: 3100,
    protocol: 'HTTP/2.0',
    details: {
      headers: {},
      queryParams: { interval: 'hourly' },
      body: null,
      responseSummary: 'Hourly aggregate computed across 12 buckets.'
    }
  },
  {
    id: 'LOG-1022',
    timestamp: '2026-11-11 22:08:05',
    ip: '185.190.141.2',
    method: 'POST',
    url: '/api/v1/auth/login',
    statusCode: 401,
    responseTime: 195,
    severity: 'WARN',
    userAgent: 'Mozilla/5.0 (compatible; Mediapartners-Google)',
    referer: 'Direct / Script',
    country: 'France',
    bytesSent: 340,
    protocol: 'HTTP/1.1',
    details: {
      headers: { 'Content-Type': 'application/json' },
      queryParams: {},
      body: '{"username":"root","passphrase":"toor"}',
      responseSummary: 'Failed credential check: User "root" does not exist in domain directory.'
    }
  },
  {
    id: 'LOG-1023',
    timestamp: '2026-11-11 22:05:42',
    ip: '192.168.1.105',
    method: 'GET',
    url: '/api/v1/users',
    statusCode: 200,
    responseTime: 52,
    severity: 'INFO',
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
    referer: 'https://admin.logmonitor.internal/users',
    country: 'United States',
    bytesSent: 5420,
    protocol: 'HTTP/2.0',
    details: {
      headers: {},
      queryParams: {},
      body: null,
      responseSummary: 'Retrieved 8 user accounts for administration management table.'
    }
  },
  {
    id: 'LOG-1024',
    timestamp: '2026-11-11 22:02:11',
    ip: '45.155.205.233',
    method: 'GET',
    url: '/cgi-bin/test-cgi',
    statusCode: 404,
    responseTime: 20,
    severity: 'WARN',
    userAgent: 'Nikto/2.1.6',
    referer: 'Direct / Nikto',
    country: 'Bulgaria',
    bytesSent: 280,
    protocol: 'HTTP/1.1',
    details: {
      headers: {},
      queryParams: {},
      body: null,
      responseSummary: 'Legacy CGI path does not exist on modern Spring Boot web server.'
    }
  },
  {
    id: 'LOG-1025',
    timestamp: '2026-11-11 21:58:39',
    ip: '10.0.3.14',
    method: 'POST',
    url: '/api/v1/data-sync/export',
    statusCode: 500,
    responseTime: 2890,
    severity: 'ERROR',
    userAgent: 'SyncWorker/3.1',
    referer: 'Internal Cron',
    country: 'Internal VPC',
    bytesSent: 940,
    protocol: 'HTTP/1.1',
    details: {
      headers: {},
      queryParams: {},
      body: '{"target":"WAREHOUSE_DB","tables":["logs","events"]}',
      responseSummary: 'java.sql.SQLException: Connection reset by peer during bulk batch insert of 5000 records.',
      stackTrace: `java.sql.SQLException: Connection reset by peer
    at com.mysql.cj.jdbc.exceptions.SQLError.createSQLException(SQLError.java:129)
    at com.mysql.cj.jdbc.ClientPreparedStatement.executeBatchedInserts(ClientPreparedStatement.java:708)`
    }
  },
  {
    id: 'LOG-1026',
    timestamp: '2026-11-11 21:55:00',
    ip: '192.168.1.18',
    method: 'GET',
    url: '/api/v1/error-analysis/distribution',
    statusCode: 200,
    responseTime: 78,
    severity: 'INFO',
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
    referer: 'https://admin.logmonitor.internal/errors',
    country: 'United States',
    bytesSent: 3620,
    protocol: 'HTTP/2.0',
    details: {
      headers: {},
      queryParams: { timeframe: '7d' },
      body: null,
      responseSummary: 'Calculated 4xx vs 5xx error distribution grouped by status code.'
    }
  },
  {
    id: 'LOG-1027',
    timestamp: '2026-11-11 21:52:19',
    ip: '103.21.244.0',
    method: 'GET',
    url: '/api/v1/products/featured',
    statusCode: 200,
    responseTime: 34,
    severity: 'INFO',
    userAgent: 'Mozilla/5.0 (Linux; Android 14)',
    referer: 'https://store.company.com',
    country: 'India',
    bytesSent: 8940,
    protocol: 'HTTP/2.0',
    details: {
      headers: {},
      queryParams: {},
      body: null,
      responseSummary: 'Served 12 featured catalog items from in-memory cache.'
    }
  },
  {
    id: 'LOG-1028',
    timestamp: '2026-11-11 21:49:10',
    ip: '198.51.100.99',
    method: 'DELETE',
    url: '/api/v1/sessions/current',
    statusCode: 200,
    responseTime: 40,
    severity: 'INFO',
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
    referer: 'https://admin.logmonitor.internal',
    country: 'Canada',
    bytesSent: 512,
    protocol: 'HTTP/2.0',
    details: {
      headers: {},
      queryParams: {},
      body: null,
      responseSummary: 'Session token invalidated from Redis token store.'
    }
  },
  {
    id: 'LOG-1029',
    timestamp: '2026-11-11 21:45:22',
    ip: '185.156.73.54',
    method: 'POST',
    url: '/api/v1/auth/login',
    statusCode: 401,
    responseTime: 210,
    severity: 'WARN',
    userAgent: 'Hydra/9.5',
    referer: 'Direct / Attack Tool',
    country: 'Seychelles',
    bytesSent: 340,
    protocol: 'HTTP/1.1',
    details: {
      headers: {},
      queryParams: {},
      body: '{"username":"administrator","passphrase":"password123"}',
      responseSummary: 'Rate limiter activated: IP 185.156.73.54 hit 10 failed login attempts in 60 seconds.'
    }
  },
  {
    id: 'LOG-1030',
    timestamp: '2026-11-11 21:40:15',
    ip: '192.168.1.105',
    method: 'GET',
    url: '/api/v1/system/metrics',
    statusCode: 200,
    responseTime: 62,
    severity: 'INFO',
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
    referer: 'https://admin.logmonitor.internal/dashboard',
    country: 'United States',
    bytesSent: 2840,
    protocol: 'HTTP/2.0',
    details: {
      headers: {},
      queryParams: {},
      body: null,
      responseSummary: 'System metrics: CPU 28.4%, RAM 54.2%, Disk 68.7%, Throughput 142 req/s.'
    }
  }
];
