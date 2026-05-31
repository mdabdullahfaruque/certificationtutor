import { buildQuestions, QSeed } from './_builder'

const seeds: QSeed[] = [
  // ── ML techniques ───────────────────────────────────────────────
  {
    id: 'ml-001', topicId: 'ml-techniques', difficulty: 'easy',
    question: 'You want to predict the selling price of a house from its size and location. Which ML technique is this?',
    options: ['Classification', 'Regression', 'Clustering', 'Anomaly detection'],
    correctAnswer: 1,
    explanation: 'Predicting a continuous numeric value (price) is a regression problem.',
  },
  {
    id: 'ml-002', topicId: 'ml-techniques', difficulty: 'easy',
    question: 'You want to predict whether an email is spam or not spam. Which ML technique is this?',
    options: ['Regression', 'Clustering', 'Classification', 'Forecasting'],
    correctAnswer: 2,
    explanation: 'Predicting a discrete category/label (spam vs not spam) is classification.',
  },
  {
    id: 'ml-003', topicId: 'ml-techniques', difficulty: 'easy',
    question: 'You want to group customers into segments based on purchasing behavior without predefined labels. Which technique is this?',
    options: ['Clustering', 'Classification', 'Regression', 'Translation'],
    correctAnswer: 0,
    explanation: 'Grouping unlabeled data by similarity is clustering, an unsupervised technique.',
  },
  {
    id: 'ml-004', topicId: 'ml-techniques', difficulty: 'medium',
    question: 'Predicting tomorrow\'s temperature in degrees is an example of which technique?',
    options: ['Classification', 'Clustering', 'Regression', 'Object detection'],
    correctAnswer: 2,
    explanation: 'A numeric prediction (temperature) is regression.',
  },
  {
    id: 'ml-005', topicId: 'ml-techniques', difficulty: 'medium',
    question: 'Determining whether a tumor is benign or malignant from medical data is which technique?',
    options: ['Regression', 'Classification', 'Clustering', 'Key phrase extraction'],
    correctAnswer: 1,
    explanation: 'Choosing between defined classes (benign/malignant) is classification.',
  },
  {
    id: 'ml-006', topicId: 'ml-techniques', difficulty: 'medium',
    question: 'Which technique uses UNLABELED data?',
    options: ['Regression', 'Classification', 'Clustering', 'Supervised learning'],
    correctAnswer: 2,
    explanation: 'Clustering is unsupervised and works on unlabeled data; regression and classification are supervised (labeled).',
  },
  {
    id: 'ml-007', topicId: 'ml-techniques', difficulty: 'hard',
    question: 'A retailer wants to predict how many units of a product will sell next month. Which technique fits best?',
    options: ['Classification', 'Regression', 'Clustering', 'Sentiment analysis'],
    correctAnswer: 1,
    explanation: 'Predicting a numeric quantity (units sold) is regression.',
  },
  {
    id: 'ml-008', topicId: 'ml-techniques', difficulty: 'medium',
    question: 'Which statement about supervised vs unsupervised learning is correct?',
    options: [
      'Supervised learning uses unlabeled data',
      'Clustering is a supervised technique',
      'Regression and classification are supervised; clustering is unsupervised',
      'Unsupervised learning requires labeled data',
    ],
    correctAnswer: 2,
    explanation: 'Regression and classification require labeled data (supervised); clustering does not (unsupervised).',
  },
  {
    id: 'ml-009', topicId: 'ml-techniques', difficulty: 'medium',
    question: 'Classifying a photo into exactly one of "cat", "dog", or "bird" is which kind of classification?',
    options: ['Binary classification', 'Multiclass classification', 'Regression', 'Clustering'],
    correctAnswer: 1,
    explanation: 'Choosing one label among three or more classes is multiclass classification.',
  },
  {
    id: 'ml-010', topicId: 'ml-techniques', difficulty: 'easy',
    question: 'Predicting "yes" or "no" for whether a customer will churn is which kind of classification?',
    options: ['Binary classification', 'Multiclass classification', 'Regression', 'Clustering'],
    correctAnswer: 0,
    explanation: 'Two possible outcomes (yes/no) is binary classification.',
  },

  // ── Deep learning & Transformer ─────────────────────────────────
  {
    id: 'ml-011', topicId: 'deep-learning-transformer', difficulty: 'medium',
    question: 'Which architecture is the foundation of modern large language models?',
    options: ['Convolutional neural network', 'Transformer', 'Decision tree', 'K-means'],
    correctAnswer: 1,
    explanation: 'The Transformer architecture (with attention) underpins modern LLMs such as GPT.',
  },
  {
    id: 'ml-012', topicId: 'deep-learning-transformer', difficulty: 'easy',
    question: 'Deep learning is based on which underlying structure?',
    options: ['Spreadsheets', 'Multi-layer neural networks', 'Relational databases', 'Decision tables'],
    correctAnswer: 1,
    explanation: 'Deep learning uses neural networks with many (deep) layers to learn complex patterns.',
  },
  {
    id: 'ml-013', topicId: 'deep-learning-transformer', difficulty: 'medium',
    question: 'Which key mechanism in the Transformer architecture lets the model weigh the importance of different words in a sequence?',
    options: ['Attention', 'Pooling', 'Normalization', 'Clustering'],
    correctAnswer: 0,
    explanation: 'The attention mechanism lets Transformers focus on the most relevant parts of the input sequence.',
  },

  // ── Features & labels, training/validation ──────────────────────
  {
    id: 'ml-014', topicId: 'features-labels', difficulty: 'easy',
    question: 'In a dataset used to predict house prices, the price column is the:',
    options: ['Feature', 'Label', 'Hyperparameter', 'Cluster'],
    correctAnswer: 1,
    explanation: 'The value you want to predict (price) is the label.',
  },
  {
    id: 'ml-015', topicId: 'features-labels', difficulty: 'easy',
    question: 'In the same house-price dataset, columns like size, bedrooms, and location are the:',
    options: ['Labels', 'Features', 'Predictions', 'Clusters'],
    correctAnswer: 1,
    explanation: 'Input/predictor columns are features.',
  },
  {
    id: 'ml-016', topicId: 'features-labels', difficulty: 'medium',
    question: 'Why is a dataset split into training and validation sets?',
    options: [
      'To make training faster only',
      'To evaluate how well the model generalizes to unseen data',
      'To remove all features',
      'To label the data automatically',
    ],
    correctAnswer: 1,
    explanation: 'The validation/test set measures performance on data the model did not train on, indicating generalization.',
  },
  {
    id: 'ml-017', topicId: 'features-labels', difficulty: 'medium',
    question: 'A model has high accuracy on training data but poor accuracy on validation data. What is this called?',
    options: ['Underfitting', 'Overfitting', 'Clustering', 'Normalization'],
    correctAnswer: 1,
    explanation: 'Overfitting is when a model memorizes training data but fails to generalize to new data.',
  },
  {
    id: 'ml-018', topicId: 'features-labels', difficulty: 'hard',
    question: 'Which dataset is used to FIT the model\'s parameters?',
    options: ['Validation dataset', 'Training dataset', 'Test dataset', 'Production dataset'],
    correctAnswer: 1,
    explanation: 'The training dataset is used to learn/fit the model; validation/test data evaluate it.',
  },

  // ── Azure ML capabilities ───────────────────────────────────────
  {
    id: 'ml-019', topicId: 'azure-ml', difficulty: 'easy',
    question: 'Which Azure Machine Learning capability automatically tries multiple algorithms and hyperparameters to find the best model?',
    options: ['Automated machine learning (AutoML)', 'Designer', 'Data labeling', 'Compute instance'],
    correctAnswer: 0,
    explanation: 'AutoML automates algorithm and hyperparameter selection to produce the best-performing model.',
  },
  {
    id: 'ml-020', topicId: 'azure-ml', difficulty: 'easy',
    question: 'Which Azure Machine Learning feature lets you build ML pipelines with a no-code, drag-and-drop interface?',
    options: ['Designer', 'AutoML', 'SDK', 'Notebooks'],
    correctAnswer: 0,
    explanation: 'Azure ML Designer provides a visual, drag-and-drop pipeline builder.',
  },
  {
    id: 'ml-021', topicId: 'azure-ml', difficulty: 'medium',
    question: 'A data scientist with no time to manually test algorithms wants the best model quickly. Which capability should they use?',
    options: ['Designer', 'Automated machine learning', 'Data labeling', 'Responsible AI dashboard'],
    correctAnswer: 1,
    explanation: 'AutoML is ideal for quickly finding a strong model without manually trying each algorithm.',
  },
  {
    id: 'ml-022', topicId: 'azure-ml', difficulty: 'medium',
    question: 'After training, what does model deployment in Azure Machine Learning produce so apps can get predictions?',
    options: ['A dataset', 'An endpoint', 'A cluster', 'A label'],
    correctAnswer: 1,
    explanation: 'Deploying a model creates an endpoint (web service) that applications call to get predictions (inference).',
  },
  {
    id: 'ml-023', topicId: 'azure-ml', difficulty: 'medium',
    question: 'Which Azure Machine Learning concept provides the scalable processing power to train models?',
    options: ['Compute (clusters/instances)', 'Labels', 'Endpoints', 'Features'],
    correctAnswer: 0,
    explanation: 'Azure ML compute (compute instances and clusters) provides the processing power for training and inference.',
  },
  {
    id: 'ml-024', topicId: 'azure-ml', difficulty: 'hard',
    question: 'Which Azure ML capability helps you register, version, and track models over their lifecycle?',
    options: ['Model management (model registry)', 'AutoML', 'Designer', 'Data labeling'],
    correctAnswer: 0,
    explanation: 'The model registry provides model management — registering, versioning, and tracking models for deployment.',
  },
  {
    id: 'ml-025', topicId: 'azure-ml', difficulty: 'medium',
    question: 'Which task prepares raw images or text with correct answers so a supervised model can learn?',
    options: ['Data labeling', 'Clustering', 'Deployment', 'Scaling out'],
    correctAnswer: 0,
    explanation: 'Data labeling assigns the correct labels to data, which is required for supervised training.',
  },

  // ── Additional technique reinforcement ──────────────────────────
  {
    id: 'ml-026', topicId: 'ml-techniques', difficulty: 'medium',
    question: 'Recommending movies by grouping users with similar tastes (no predefined categories) is which technique?',
    options: ['Clustering', 'Regression', 'Binary classification', 'OCR'],
    correctAnswer: 0,
    explanation: 'Grouping similar items/users without predefined labels is clustering.',
  },
  {
    id: 'ml-027', topicId: 'ml-techniques', difficulty: 'hard',
    question: 'Which scenario is NOT a regression problem?',
    options: [
      'Predicting a car\'s resale value',
      'Predicting next quarter\'s revenue',
      'Predicting whether a transaction is fraudulent (yes/no)',
      'Predicting tomorrow\'s rainfall in millimeters',
    ],
    correctAnswer: 2,
    explanation: 'A yes/no outcome is classification, not regression. The others predict numeric values.',
  },
  {
    id: 'ml-028', topicId: 'features-labels', difficulty: 'easy',
    question: 'In supervised learning, what must the training data contain that unsupervised learning does not require?',
    options: ['Labels', 'Images', 'Clusters', 'Endpoints'],
    correctAnswer: 0,
    explanation: 'Supervised learning requires labeled training data; unsupervised learning does not.',
  },
  {
    id: 'ml-029', topicId: 'azure-ml', difficulty: 'easy',
    question: 'What is Azure Machine Learning primarily used for?',
    options: [
      'Hosting static websites',
      'Training, deploying, and managing machine learning models',
      'Sending email campaigns',
      'Translating documents only',
    ],
    correctAnswer: 1,
    explanation: 'Azure Machine Learning is a cloud platform for the end-to-end ML lifecycle: train, deploy, and manage models.',
  },
  {
    id: 'ml-030', topicId: 'deep-learning-transformer', difficulty: 'hard',
    question: 'Which statement about deep learning is TRUE?',
    options: [
      'It always needs less data than traditional ML',
      'It uses neural networks with multiple layers to learn complex patterns',
      'It cannot be used for images',
      'It only works for regression',
    ],
    correctAnswer: 1,
    explanation: 'Deep learning uses multi-layer neural networks and excels at complex tasks like vision and language, typically benefiting from large datasets.',
  },
]

export const machineLearningQuestions = buildQuestions(
  'machine-learning',
  'Describe fundamental principles of machine learning on Azure',
  seeds,
)
