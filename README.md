# System Design Decisions

Designing a system that can handle daily traffic and peak hours effectively involves considering various factors, including architecture, database choice, and scalability measures. Approach to the system design for ecommerce web application:

### 1. **System Architecture: Monolithic vs. Microservices**

#### Monolithic Architecture:
- **Pros:**
  - Simplicity in development and deployment.
  - Easier to debug and test.
  - Single codebase.
- **Cons:**
  - Scalability challenges.
  - Potential for slower development as the application grows.
  - Difficulties in adopting new technologies independently.

#### Microservices Architecture:
- **Pros:**
  - Improved scalability by scaling individual services.
  - Independent development and deployment of services.
  - Easier maintenance and updates for specific components.
- **Cons:**
  - Increased complexity in deployment and monitoring.
  - Potential challenges in ensuring consistency across services.
  - Requires effective communication between services.

**Recommendation:**
Considering the expected traffic and scalability requirements, a microservices architecture may be more suitable. It allows you to scale individual components based on demand and facilitates independent development and deployment.

### 2. **Database Choice: DynamoDB vs. MongoDB**

#### DynamoDB:
- **Pros:**
  - Fully managed, scalable NoSQL database by AWS.
  - Automatic scaling based on traffic.
  - Low-latency performance.
- **Cons:**
  - Limited query capabilities compared to MongoDB.
  - Costs may increase with high read and write throughput.

#### MongoDB:
- **Pros:**
  - Flexible schema, suitable for ecommerce products.
  - Rich query language.
  - Suitable for complex data structures.
- **Cons:**
  - Requires manual sharding for high scalability.
  - May need more manual management compared to DynamoDB.

**Recommendation:**
Considering your specific use case, MongoDB might be more suitable due to its flexibility and query capabilities. However, both databases can be used effectively based on your team's familiarity and the specific requirements.

### 3. **Scalability Measures:**

#### Horizontal Scaling:
- Deploy multiple instances of the application behind a load balancer.
- Use AWS Auto Scaling to automatically adjust the number of EC2 instances based on traffic.

#### CDN Integration:
- Leverage AWS CloudFront to cache and deliver static assets, reducing load on your servers.

#### Database Scaling:
- For MongoDB, consider sharding for horizontal database scaling.
- Use read replicas for improved read performance.

### 4. **AWS Services Integration:**

#### AWS S3 for Image Storage:
- Store product images in S3 and serve them via CloudFront for fast, scalable content delivery.

#### AWS Elastic Load Balancer (ELB):
- Distribute incoming application traffic across multiple EC2 instances.

#### AWS Lambda:
- Consider using Lambda functions for specific tasks like image resizing or background jobs.

### 5. **Client and Backend Technologies:**

#### NextJS (Client Side):
- Utilize NextJS for server-side rendering, enhancing performance and SEO.

#### ExpressJS (Backend):
- Leverage ExpressJS for building RESTful APIs, following the MVC architecture.

### 6. **Capacity Planning:**

#### Define Metrics:
- Identify key performance indicators (KPIs) like response time, error rate, and throughput.

#### Load Testing:
- Perform load testing to simulate peak traffic conditions and identify bottlenecks.

#### Monitoring:
- Implement robust monitoring using tools like AWS CloudWatch to track system performance.

### 7. **High Availability:**

#### Multi-AZ Deployment:
- Deploy resources across multiple availability zones for redundancy and high availability.

#### Disaster Recovery:
- Develop a disaster recovery plan and regularly test its effectiveness.

### 8. **Security Considerations:**

#### AWS Identity and Access Management (IAM):
- Implement fine-grained access controls for AWS services.

#### Encryption:
- Encrypt data in transit using HTTPS and use server-side encryption for data at rest in S3.

#### Regular Audits:
- Conduct security audits and ensure compliance with industry standards.

### 9. **Documentation:**

#### Comprehensive Documentation:
- Maintain thorough documentation for deployment, maintenance, and troubleshooting.

### Diagrams:
Use draw.io to create diagrams illustrating the architecture, data flow, and interactions between components.

Remember to iterate on your design as your application evolves and adapts to changing requirements. This approach provides a solid foundation for your ecommerce web application, combining scalability, flexibility, and performance.


## **System Design Diagram**
![image](https://github.com/crescents-stack/deinhandymarkt/assets/99522246/87727eb9-3859-474e-aa05-d004d609cbd7)

## **Order Flow**
![image](https://github.com/crescents-stack/deinhandymarkt/assets/99522246/10d7cc22-5e88-4716-9380-286f2645ba6a)


