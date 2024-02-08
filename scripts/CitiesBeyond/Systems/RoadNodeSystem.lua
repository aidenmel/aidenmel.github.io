--[[

    [LOCAL] Road Node System (RNS)
    The system that runs road creation and placement.

]]--

-- Variables

    -- Services
    local UserInputService = game:GetService("UserInputService");
    local Players = game:GetService("Players");

    -- Objects
    local Client = Players.LocalPlayer;
    local Character = Client.Character or Client.CharacterAdded:Wait();

    -- Raycasting
    local ScreenRay = RaycastParams.new();
    ScreenRay.FilterDescendantsInstances = {Character}
    ScreenRay.FilterType = Enum.RaycastFilterType.Blacklist;
    ScreenRay.IgnoreWater = true;

-- Functions

-- Events
UserInputService.InputChanged:Connect(function(input, gameProcessedEvent)
    if not gameProcessedEvent then
        if input.UserInputType == Enum.UserInputType.MouseMovement then
        
            local MouseLocation = UserInputService:GetMouseLocation();
            local RayToMouse = workspace.CurrentCamera:ScreenPointToRay(MouseLocation.X, MouseLocation.Y, 1);

            local HitCheck = workspace:Raycast(RayToMouse.Origin + RayToMouse.Direction * 500, ScreenRay).
            local HitPosition = RayToMouse.Origin + RayToMouse.Direction * 500;

            if HitCheck and HitCheck.Instance then
                if HitCheck.Instance.CanCollide  and HitCheck.Instance.Transparency < 1 then
                    HitPosition = HitCheck.Position
                end
            end

        end
    end
end)

