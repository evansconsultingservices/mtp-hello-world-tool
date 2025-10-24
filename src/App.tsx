import React, { useState } from 'react';
import { Button } from './components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './components/ui/card';
import { MessageSquare, User, Clock, CheckCircle } from 'lucide-react';

// Mock user data for testing (in real implementation, this would come from JWT token)
const mockUser = {
  id: 'user123',
  firstName: 'John',
  lastName: 'Doe',
  email: 'john.doe@example.com',
  role: 'user',
  organizationId: 'org_example'
};

function App() {
  const [messages, setMessages] = useState<string[]>([]);
  const [message, setMessage] = useState('');

  const addMessage = () => {
    if (message.trim()) {
      setMessages([...messages, message]);
      setMessage('');
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <div className="flex items-center space-x-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
              <MessageSquare className="h-5 w-5 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-lg font-semibold text-foreground">Hello World Tool</h1>
              <p className="text-xs text-muted-foreground">Example Child Application</p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <div className="text-right">
              <p className="text-sm font-medium text-foreground">{mockUser.firstName} {mockUser.lastName}</p>
              <p className="text-xs text-muted-foreground">{mockUser.email}</p>
            </div>
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted">
              <User className="h-4 w-4" />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="space-y-8">
          {/* Welcome Section */}
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tight text-foreground">
              Welcome to Hello World Tool
            </h2>
            <p className="text-muted-foreground">
              This is a simple example child application demonstrating integration with the multi-tenant platform.
            </p>
          </div>

          {/* User Info */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">User ID</CardTitle>
                <User className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-lg font-bold">{mockUser.id}</div>
                <p className="text-xs text-muted-foreground">Authenticated user</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Role</CardTitle>
                <CheckCircle className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-lg font-bold capitalize">{mockUser.role}</div>
                <p className="text-xs text-muted-foreground">Access level</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Organization</CardTitle>
                <MessageSquare className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-lg font-bold">{mockUser.organizationId}</div>
                <p className="text-xs text-muted-foreground">Organization ID</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Messages</CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-lg font-bold">{messages.length}</div>
                <p className="text-xs text-muted-foreground">Total sent</p>
              </CardContent>
            </Card>
          </div>

          {/* Interactive Section */}
          <Card>
            <CardHeader>
              <CardTitle>Interactive Demo</CardTitle>
              <CardDescription>
                Add messages to demonstrate the tool functionality
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex space-x-2">
                  <input
                    type="text"
                    placeholder="Enter a message..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && addMessage()}
                    className="flex-1 px-3 py-2 border border-input bg-background rounded-md text-sm"
                  />
                  <Button onClick={addMessage}>
                    Add Message
                  </Button>
                </div>

                {messages.length > 0 && (
                  <div className="space-y-2">
                    <h4 className="font-medium text-foreground">Your Messages:</h4>
                    <div className="space-y-1">
                      {messages.map((msg, index) => (
                        <div
                          key={index}
                          className="flex items-center space-x-2 p-2 bg-muted rounded-md"
                        >
                          <MessageSquare className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm text-foreground">{msg}</span>
                        </div>
                      ))}
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setMessages([])}
                    >
                      Clear All
                    </Button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Integration Status */}
          <Card>
            <CardHeader>
              <CardTitle>Integration Status</CardTitle>
              <CardDescription>
                Current integration with the parent platform
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span className="text-sm text-foreground">Shadcn/ui components loaded</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span className="text-sm text-foreground">Dark mode theming configured</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span className="text-sm text-foreground">Mock user data available</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="h-5 w-5 text-yellow-500" />
                  <span className="text-sm text-foreground">JWT token validation (pending platform integration)</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="h-5 w-5 text-yellow-500" />
                  <span className="text-sm text-foreground">Reverse proxy routing (pending platform integration)</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}

export default App;
