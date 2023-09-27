--[[

    Spotlight Performances Scripts
    | For Techo Inc.

]]--

-- Variables

    -- Modules
    local BezierModule = require(BezierModule);

    -- Objects
    local Boards = script.Parent['Boards'];

    -- Panel Directories
    local Main = script.Parent['Selections'];
    local SelectionButtonTemp = Main['ButtonTemplate']

-- Events

    -- Boards
    for index,value in pairs(Boards:GetChildren()) do
        
        if index:IsA('Model') then
            
            local NewButton = 

        end

    end



--[[

    Jose Curtain Script
    | For Techo Inc.

]]--

-- Variables

    local Curtain = script.Parent['Curtain']

    -- Services
    local TweenService = game:GetService("TweenService")
        local PresetTweenInfo = TweenInfo.new(1.2, Enum.EasingStyle.Quad, Enum.EasingDirection.Out, 0)

    -- Boards
    local CurtainBoard = script.Parent['Boards']
    local Selections = CurtainBoard['Selections']

-- Functions
local function TweenObject(Object, TweenInformation, Result)
    
    -- Determine TweenInformation; If number, make new TweenInfo
    if tonumber(TweenInformation) ~= nil then
        TweenInformation = TweenInfo.new(TweenInformation, PresetTweenInfo.EasingStyle, PresetTweenInfo.EasingDirection, PresetTweenInfo.RepeatCount)
    elseif not TweenInformation then
        TweenInformation = PresetTweenInfo
    end



end

-- Events

    Selections['CurtainUp'].MouseButton1Click:Connect(function()
        
        if 

    end)